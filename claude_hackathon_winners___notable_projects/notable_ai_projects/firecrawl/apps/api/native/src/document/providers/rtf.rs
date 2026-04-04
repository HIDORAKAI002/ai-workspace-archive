use crate::document::model::*;
use crate::document::providers::DocumentProvider;
use chrono::{DateTime, NaiveDate, NaiveDateTime, Utc};
use std::error::Error;
use std::num::NonZeroU32;

pub struct RtfProvider;

impl RtfProvider {
  pub fn new() -> Self {
    Self
  }
}

impl DocumentProvider for RtfProvider {
  fn parse_buffer(&self, data: &[u8]) -> Result<Document, Box<dyn Error + Send + Sync>> {
    let metadata = extract_metadata_from_info(data).unwrap_or_default();
    let blocks = parse_rtf_body_to_blocks(data);

    Ok(Document {
      blocks,
      metadata,
      notes: Vec::new(),
      comments: Vec::new(),
    })
  }

  fn name(&self) -> &'static str {
    "rtf"
  }
}

fn extract_metadata_from_info(src: &[u8]) -> Option<DocumentMetadata> {
  let start = find_group_start(src, b"{\\info")?;
  let end = find_matching_brace(src, start)?;
  let info = &src[start..end];

  let mut meta = DocumentMetadata::default();

  if let Some(author) = extract_simple_text_dest(info, br"{\author") {
    if !author.eq_ignore_ascii_case("unknown") {
      meta.author = Some(author);
    }
  }

  if let Some(title) = extract_simple_text_dest(info, br"{\title") {
    if !title.trim().is_empty() {
      meta.title = Some(title);
    }
  }

  if let Some(created) = extract_creatim(info) {
    meta.created = Some(created);
  }

  Some(meta)
}

fn find_group_start(buf: &[u8], needle: &[u8]) -> Option<usize> {
  buf.windows(needle.len()).position(|w| w == needle)
}

fn find_matching_brace(buf: &[u8], start: usize) -> Option<usize> {
  let mut depth = 0usize;
  for (i, &b) in buf[start..].iter().enumerate() {
    match b {
      b'{' => depth += 1,
      b'}' => {
        depth -= 1;
        if depth == 0 {
          return Some(start + i + 1);
        }
      }
      _ => {}
    }
  }
  None
}

fn extract_simple_text_dest(buf: &[u8], start_tag: &[u8]) -> Option<String> {
  let s = find_group_start(buf, start_tag)?;
  let e = find_matching_brace(buf, s)?;
  let mut out = String::new();
  for &b in &buf[s + start_tag.len()..e - 1] {
    push_byte_as_text(b, &mut out);
  }
  if out.trim().is_empty() {
    None
  } else {
    Some(out.trim().to_string())
  }
}

fn extract_creatim(buf: &[u8]) -> Option<DateTime<Utc>> {
  let s = find_group_start(buf, br"{\creatim")?;
  let e = find_matching_brace(buf, s)?;
  let g = &buf[s..e];

  let mut yr: Option<i32> = None;
  let mut mo: Option<u32> = None;
  let mut dy: Option<u32> = None;
  let mut hr: Option<u32> = None;
  let mut mi: Option<u32> = None;

  let mut i = 0usize;
  while i < g.len() {
    if g[i] == b'\\' {
      if let Some((word, val, ni)) = read_control_word(g, i + 1) {
        match word.as_str() {
          "yr" => yr = val,
          "mo" => mo = val.map(|v| v as u32),
          "dy" => dy = val.map(|v| v as u32),
          "hr" => hr = val.map(|v| v as u32),
          "min" => mi = val.map(|v| v as u32),
          _ => {}
        }
        i = ni;
        continue;
      }
    }
    i += 1;
  }

  let date = NaiveDate::from_ymd_opt(yr?, mo?, dy?)?;
  let time = chrono::NaiveTime::from_hms_opt(hr.unwrap_or(0), mi.unwrap_or(0), 0)?;
  let dt = NaiveDateTime::new(date, time);
  Some(DateTime::<Utc>::from_naive_utc_and_offset(dt, Utc))
}

#[derive(Default)]
struct TableBuilder {
  rows: Vec<TableRow>,
  current_row: Vec<TableCell>,
  current_cell_blocks: Vec<Block>,
}

impl TableBuilder {
  fn start_row(&mut self) {
    self.current_cell_blocks.clear();
    self.current_row.clear();
  }

  fn push_block(&mut self, block: Block) {
    self.current_cell_blocks.push(block);
  }

  fn finish_cell(&mut self) {
    if self.current_cell_blocks.is_empty() {
      return;
    }
    let cell = TableCell {
      blocks: std::mem::take(&mut self.current_cell_blocks),
      colspan: NonZeroU32::new(1).unwrap(),
      rowspan: NonZeroU32::new(1).unwrap(),
    };
    self.current_row.push(cell);
  }

  fn finish_row(&mut self) {
    self.finish_cell();
    if self.current_row.is_empty() {
      return;
    }
    let row = TableRow {
      cells: std::mem::take(&mut self.current_row),
      kind: TableRowKind::Body,
    };
    self.rows.push(row);
  }

  fn finalize(mut self) -> Option<Block> {
    self.finish_row();
    if self.rows.is_empty() {
      None
    } else {
      Some(Block::Table(Table { rows: self.rows }))
    }
  }
}

fn push_block_target(
  block: Block,
  blocks: &mut Vec<Block>,
  table: &mut Option<TableBuilder>,
  in_table_cell: bool,
) {
  if in_table_cell {
    if let Some(builder) = table.as_mut() {
      builder.push_block(block);
    } else {
      blocks.push(block);
    }
  } else {
    if let Some(builder) = table.take() {
      if let Some(table_block) = builder.finalize() {
        blocks.push(table_block);
      }
    }
    blocks.push(block);
  }
}

fn flush_table(blocks: &mut Vec<Block>, table: &mut Option<TableBuilder>) {
  if let Some(builder) = table.take() {
    if let Some(block) = builder.finalize() {
      blocks.push(block);
    }
  }
}

fn parse_rtf_body_to_blocks(src: &[u8]) -> Vec<Block> {
  let mut p = 0usize;
  let n = src.len();

  #[derive(Clone, Default, Debug, PartialEq, Eq)]
  struct State {
    bold: bool,
    italic: bool,
    strike: bool,
    sup: bool,
    sub: bool,
  }

  #[derive(Clone)]
  struct Group {
    saved: State,
    skip: bool,
    name_seen: bool,
  }

  let mut state = State::default();
  let mut stack: Vec<Group> = Vec::new();
  let mut blocks: Vec<Block> = Vec::new();
  let mut cur_inlines: Vec<Inline> = Vec::new();
  let mut text_buf = String::new();
  let mut table_builder: Option<TableBuilder> = None;
  let mut in_table_cell = false;
  let mut uc_skip: usize = 1;
  let mut pending_uc_skip: usize = 0;

  const SKIP_DESTS: &[&str] = &[
    "fonttbl",
    "colortbl",
    "stylesheet",
    "listtable",
    "listoverridetable",
    "themedata",
    "latentstyles",
    "rsidtbl",
    "xmlnstbl",
    "mmathPr",
    "wgrffmtfilter",
    "datastore",
    "filetbl",
    "colorschememapping",
    "pnseclvl1",
    "pnseclvl2",
    "pnseclvl3",
    "pnseclvl4",
    "pnseclvl5",
    "pnseclvl6",
    "pnseclvl7",
    "pnseclvl8",
    "pnseclvl9",
    "pict",
    "object",
    "info",
  ];

  fn style_wrap(mut node: Inline, st: &State) -> Inline {
    if st.strike {
      node = Inline::Del(vec![node]);
    }
    if st.italic {
      node = Inline::Em(vec![node]);
    }
    if st.bold {
      node = Inline::Strong(vec![node]);
    }
    if st.sup {
      node = Inline::Sup(vec![node]);
    } else if st.sub {
      node = Inline::Sub(vec![node]);
    }
    node
  }

  fn push_text_buf(text_buf: &mut String, cur: &mut Vec<Inline>, st: &State) {
    if !text_buf.is_empty() {
      let node = style_wrap(Inline::Text(text_buf.clone()), st);
      cur.push(node);
      text_buf.clear();
    }
  }

  fn has_visible_content(inlines: &[Inline]) -> bool {
    inlines.iter().any(|i| match i {
      Inline::Text(t) => !t.trim().is_empty(),
      Inline::LineBreak => false,
      Inline::Link { children, .. } => has_visible_content(children),
      Inline::Strong(c) | Inline::Em(c) | Inline::Del(c) | Inline::Sup(c) | Inline::Sub(c) => {
        has_visible_content(c)
      }
      Inline::Code(t) => !t.trim().is_empty(),
      Inline::FootnoteRef(_) | Inline::EndnoteRef(_) | Inline::CommentRef(_) => true,
      Inline::Bookmark(_) => false,
    })
  }

  fn flush_paragraph(
    cur: &mut Vec<Inline>,
    text_buf: &mut String,
    blocks: &mut Vec<Block>,
    table: &mut Option<TableBuilder>,
    st: &State,
    in_table_cell: bool,
  ) {
    push_text_buf(text_buf, cur, st);
    if has_visible_content(cur) {
      let block = Block::Paragraph(Paragraph {
        kind: ParagraphKind::Normal,
        inlines: std::mem::take(cur),
      });
      push_block_target(block, blocks, table, in_table_cell);
    } else {
      cur.clear();
      if !in_table_cell {
        flush_table(blocks, table);
      }
    }
  }

  let flush_before_change = |text_buf: &mut String, cur: &mut Vec<Inline>, st: &State| {
    push_text_buf(text_buf, cur, st);
  };

  while p < n {
    match src[p] {
      b'{' => {
        let inherited_skip = stack.last().map(|g| g.skip).unwrap_or(false);
        stack.push(Group {
          saved: state.clone(),
          skip: inherited_skip,
          name_seen: false,
        });
        p += 1;
      }
      b'}' => {
        if let Some(g) = stack.last() {
          if !g.skip {
            flush_before_change(&mut text_buf, &mut cur_inlines, &state);
          }
        }
        if let Some(g) = stack.pop() {
          state = g.saved;
        }
        p += 1;
      }
      b'\\' => {
        if p + 1 >= n {
          break;
        }
        let next = src[p + 1];

        if next == b'\\' || next == b'{' || next == b'}' {
          if !stack.last().map(|g| g.skip).unwrap_or(false) {
            text_buf.push(next as char);
          }
          p += 2;
          continue;
        }

        if next == b'\'' {
          if p + 3 < n {
            let h1 = src[p + 2];
            let h2 = src[p + 3];
            if !stack.last().map(|g| g.skip).unwrap_or(false) {
              if let (Some(a), Some(b)) = (hex_val(h1), hex_val(h2)) {
                let byte = (a << 4) | b;
                push_byte_as_text(byte, &mut text_buf);
              }
            }
            p += 4;
            continue;
          } else {
            break;
          }
        }

        let skip = stack.last().map(|g| g.skip).unwrap_or(false);

        match next {
          b'~' => {
            if !skip {
              text_buf.push('\u{00A0}');
            } // non-breaking space
            p += 2;
            continue;
          }
          b'-' => {
            if !skip {
              text_buf.push('\u{00AD}');
            } // soft hyphen
            p += 2;
            continue;
          }
          _ => {}
        }

        if starts_with_word(src, p + 1, b"rquote") {
          if !skip {
            text_buf.push('\u{2019}');
          } // '
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"lquote") {
          if !skip {
            text_buf.push('\u{2018}');
          } // '
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"rdblquote") {
          if !skip {
            text_buf.push('\u{201D}');
          } // "
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"ldblquote") {
          if !skip {
            text_buf.push('\u{201C}');
          } // "
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"emdash") {
          if !skip {
            text_buf.push('\u{2014}');
          } // —
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"endash") {
          if !skip {
            text_buf.push('\u{2013}');
          } // –
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"bullet") {
          if !skip {
            text_buf.push('\u{2022}');
          } // •
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"line") {
          if !skip {
            push_text_buf(&mut text_buf, &mut cur_inlines, &state);
            cur_inlines.push(Inline::LineBreak);
          }
          p = skip_word_and_space(src, p + 1);
          continue;
        }
        if starts_with_word(src, p + 1, b"tab") {
          if !skip {
            text_buf.push('\t');
          }
          p = skip_word_and_space(src, p + 1);
          continue;
        }

        if let Some((word, val, new_p)) = read_control_word(src, p + 1) {
          if let Some(g) = stack.last_mut() {
            if !g.name_seen {
              g.name_seen = true;
              if word == "*" || SKIP_DESTS.contains(&word.as_str()) {
                g.skip = true;
              }
            }
          }

          let skipping = stack.last().map(|g| g.skip).unwrap_or(false);

          if !skipping {
            match word.as_str() {
              "trowd" => {
                let builder = table_builder.get_or_insert_with(TableBuilder::default);
                builder.start_row();
                in_table_cell = false;
              }
              "intbl" => {
                in_table_cell = true;
              }
              "cell" => {
                flush_paragraph(
                  &mut cur_inlines,
                  &mut text_buf,
                  &mut blocks,
                  &mut table_builder,
                  &state,
                  true,
                );
                if let Some(builder) = table_builder.as_mut() {
                  builder.finish_cell();
                }
                in_table_cell = false;
              }
              "row" => {
                if let Some(builder) = table_builder.as_mut() {
                  builder.finish_row();
                }
                in_table_cell = false;
              }
              "cellx" | "clvertalb" | "clvertalc" | "clvertalt" => {}
              "b" => {
                flush_before_change(&mut text_buf, &mut cur_inlines, &state);
                state.bold = val.map(|v| v != 0).unwrap_or(true);
              }
              "i" => {
                flush_before_change(&mut text_buf, &mut cur_inlines, &state);
                state.italic = val.map(|v| v != 0).unwrap_or(true);
              }
              "strike" | "striked" | "striked1" => {
                flush_before_change(&mut text_buf, &mut cur_inlines, &state);
                state.strike = val.map(|v| v != 0).unwrap_or(true);
              }
              "super" => {
                flush_before_change(&mut text_buf, &mut cur_inlines, &state);
                state.sup = val.map(|v| v != 0).unwrap_or(true);
                if state.sup {
                  state.sub = false;
                }
              }
              "sub" => {
                flush_before_change(&mut text_buf, &mut cur_inlines, &state);
                state.sub = val.map(|v| v != 0).unwrap_or(true);
                if state.sub {
                  state.sup = false;
                }
              }
              "nosupersub" => {
                flush_before_change(&mut text_buf, &mut cur_inlines, &state);
                state.sup = false;
                state.sub = false;
              }
              "plain" => {
                flush_before_change(&mut text_buf, &mut cur_inlines, &state);
                state = State::default();
              }
              "par" => {
                flush_paragraph(
                  &mut cur_inlines,
                  &mut text_buf,
                  &mut blocks,
                  &mut table_builder,
                  &state,
                  in_table_cell,
                );
              }
              "uc" => {
                uc_skip = val.unwrap_or(1).max(0) as usize;
              }
              "u" => {
                if let Some(mut num) = val {
                  if num < 0 {
                    num += 65536;
                  }
                  if let Some(ch) = std::char::from_u32(num as u32) {
                    text_buf.push(ch);
                  }
                  pending_uc_skip = uc_skip;
                }
              }
              _ => {}
            }
          } else if word == "par" {
            flush_paragraph(
              &mut cur_inlines,
              &mut text_buf,
              &mut blocks,
              &mut table_builder,
              &state,
              in_table_cell,
            );
          }

          let mut final_p = new_p;
          if pending_uc_skip > 0 {
            let mut k = 0usize;
            while k < pending_uc_skip && final_p < n {
              if matches!(src[final_p], b'\\' | b'{' | b'}') {
                break;
              }
              final_p += 1;
              k += 1;
            }
            pending_uc_skip = 0;
          }
          p = final_p;
          continue;
        }
        p += 1;
      }
      b'\r' | b'\n' => {
        p += 1;
      }
      byte => {
        if !stack.last().map(|g| g.skip).unwrap_or(false) {
          if pending_uc_skip > 0 {
            pending_uc_skip -= 1;
          } else {
            push_byte_as_text(byte, &mut text_buf);
          }
        }
        p += 1;
      }
    }
  }

  if !text_buf.is_empty() || !cur_inlines.is_empty() {
    flush_paragraph(
      &mut cur_inlines,
      &mut text_buf,
      &mut blocks,
      &mut table_builder,
      &state,
      in_table_cell,
    );
  }

  flush_table(&mut blocks, &mut table_builder);

  blocks
}

fn read_control_word(src: &[u8], mut i: usize) -> Option<(String, Option<i32>, usize)> {
  if i >= src.len() {
    return None;
  }

  if src[i] == b'*' {
    i += 1;
    if i < src.len() && src[i] == b' ' {
      i += 1;
    }
    return Some(("*".to_string(), None, i));
  }

  let start = i;
  while i < src.len() && is_alpha(src[i]) {
    i += 1;
  }
  if i == start {
    return None;
  }
  let word = String::from_utf8_lossy(&src[start..i]).to_string();

  let mut sign = 1i32;
  let mut val: Option<i32> = None;
  if i < src.len() && (src[i] == b'-' || is_digit(src[i])) {
    if src[i] == b'-' {
      sign = -1;
      i += 1;
    }
    let num_start = i;
    while i < src.len() && is_digit(src[i]) {
      i += 1;
    }
    if i > num_start {
      let n = std::str::from_utf8(&src[num_start..i])
        .ok()?
        .parse::<i32>()
        .ok()?;
      val = Some(sign * n);
    }
  }

  if i < src.len() && src[i] == b' ' {
    i += 1;
  }

  Some((word, val, i))
}

#[inline]
fn is_alpha(b: u8) -> bool {
  b.is_ascii_uppercase() || b.is_ascii_lowercase()
}

#[inline]
fn is_digit(b: u8) -> bool {
  b.is_ascii_digit()
}

fn hex_val(b: u8) -> Option<u8> {
  match b {
    b'0'..=b'9' => Some(b - b'0'),
    b'a'..=b'f' => Some(10 + (b - b'a')),
    b'A'..=b'F' => Some(10 + (b - b'A')),
    _ => None,
  }
}

fn push_byte_as_text(byte: u8, text_buf: &mut String) {
  let ch = decode_cp1252(byte);
  let cp = ch as u32;
  if ch == '\t' || ch == '\u{00A0}' || cp >= 0x20 {
    text_buf.push(ch);
  }
}

fn decode_cp1252(b: u8) -> char {
  if b < 0x80 {
    return b as char;
  }
  match b {
    0x80 => '\u{20AC}', // €
    0x82 => '\u{201A}', // ‚
    0x83 => '\u{0192}', // ƒ
    0x84 => '\u{201E}', // „
    0x85 => '\u{2026}', // …
    0x86 => '\u{2020}', // †
    0x87 => '\u{2021}', // ‡
    0x88 => '\u{02C6}', // ˆ
    0x89 => '\u{2030}', // ‰
    0x8A => '\u{0160}', // Š
    0x8B => '\u{2039}', // ‹
    0x8C => '\u{0152}', // Œ
    0x8E => '\u{017D}', // Ž
    0x91 => '\u{2018}', // '
    0x92 => '\u{2019}', // '
    0x93 => '\u{201C}', // "
    0x94 => '\u{201D}', // "
    0x95 => '\u{2022}', // •
    0x96 => '\u{2013}', // –
    0x97 => '\u{2014}', // —
    0x98 => '\u{02DC}', // ˜
    0x99 => '\u{2122}', // ™
    0x9A => '\u{0161}', // š
    0x9B => '\u{203A}', // ›
    0x9C => '\u{0153}', // œ
    0x9E => '\u{017E}', // ž
    0x9F => '\u{0178}', // Ÿ
    _ => b as char,
  }
}

fn starts_with_word(src: &[u8], i: usize, word: &[u8]) -> bool {
  let end = i + word.len();
  end <= src.len() && &src[i..end] == word
}

fn skip_word_and_space(src: &[u8], mut i: usize) -> usize {
  while i < src.len() && is_alpha(src[i]) {
    i += 1;
  }
  if i < src.len() && src[i] == b' ' {
    i += 1;
  }
  i
}
