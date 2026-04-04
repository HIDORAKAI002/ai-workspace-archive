use crate::document::model::*;
use crate::document::providers::DocumentProvider;
use chrono::{DateTime, Utc};
use roxmltree::{Document as XmlDoc, Node};
use std::collections::HashMap;
use std::error::Error;
use std::io::{Read, Seek};
use std::num::NonZeroU32;
use zip::read::ZipArchive;

pub struct OdtProvider;

impl OdtProvider {
  pub fn new() -> Self {
    Self
  }
}

impl DocumentProvider for OdtProvider {
  fn parse_buffer(&self, data: &[u8]) -> Result<Document, Box<dyn Error + Send + Sync>> {
    let cursor = std::io::Cursor::new(data);
    let mut zip = ZipArchive::new(cursor)?;

    let meta = read_meta(&mut zip).unwrap_or_default();
    let styles = read_styles(&mut zip);

    let content =
      read_zip_text(&mut zip, "content.xml").ok_or("Missing content.xml in document")?;
    let xml = XmlDoc::parse(strip_bom(&content))?;

    let mut notes: Vec<Note> = Vec::new();
    let mut comments: Vec<Comment> = Vec::new();
    let mut blocks: Vec<Block> = Vec::new();

    let body_text = xml
      .descendants()
      .find(|n| is_tag(n, "text") && n.ancestors().any(|a| is_tag(&a, "body")));

    if let Some(text_node) = body_text {
      blocks = parse_block_children_odt(&text_node, &styles, &mut notes, &mut comments, &mut zip);
    }

    Ok(Document {
      blocks,
      metadata: meta,
      notes,
      comments,
    })
  }

  fn name(&self) -> &'static str {
    "odt"
  }
}

fn read_zip_text<R: Read + Seek>(zip: &mut ZipArchive<R>, path: &str) -> Option<String> {
  let mut file = zip.by_name(path).ok()?;
  let mut s = String::new();
  file.read_to_string(&mut s).ok()?;
  Some(s)
}

fn strip_bom(s: &str) -> &str {
  const BOM: char = '\u{FEFF}';
  s.strip_prefix(BOM).unwrap_or(s)
}

#[derive(Debug, Default, Clone)]
struct OdtStylesInfo {
  paragraph_names: HashMap<String, String>,
  paragraph_outline_level: HashMap<String, u8>,
  paragraph_text_props: HashMap<String, TextStyleProps>,
  text_props: HashMap<String, TextStyleProps>,
  text_font_name: HashMap<String, String>,
  list_is_ordered: HashMap<String, bool>,
}

#[derive(Debug, Default, Clone, Copy)]
struct TextStyleProps {
  bold: bool,
  italic: bool,
  strike: bool,
  sup: bool,
  sub: bool,
  code: bool,
}

fn read_styles<R: Read + Seek>(zip: &mut ZipArchive<R>) -> OdtStylesInfo {
  let mut info = OdtStylesInfo::default();

  if let Some(t) = read_zip_text(zip, "styles.xml") {
    if let Ok(doc) = XmlDoc::parse(strip_bom(&t)) {
      harvest_styles_from_doc(&doc, &mut info);
    }
  }
  if let Some(t) = read_zip_text(zip, "content.xml") {
    if let Ok(doc) = XmlDoc::parse(strip_bom(&t)) {
      harvest_styles_from_doc(&doc, &mut info);
    }
  }
  info
}

fn harvest_styles_from_doc(doc: &XmlDoc, out: &mut OdtStylesInfo) {
  for s in doc.descendants().filter(|n| is_tag(n, "style")) {
    let Some(family) = get_attr_local(&s, "family") else {
      continue;
    };
    let Some(name) = get_attr_local(&s, "name") else {
      continue;
    };
    let lname = name.to_string();

    if family == "paragraph" {
      out.paragraph_names.insert(lname.clone(), lname.clone());

      if let Some(ppr) = child(&s, "paragraph-properties") {
        if let Some(ol) = get_attr_local(&ppr, "outline-level") {
          if let Ok(v) = ol.parse::<u8>() {
            out.paragraph_outline_level.insert(lname.clone(), v.min(6));
          }
        }
      }

      if !out.paragraph_outline_level.contains_key(&lname) {
        if let Some(parent) = get_attr_local(&s, "parent-style-name") {
          if let Some(lv) = parse_odt_heading_level(parent) {
            out.paragraph_outline_level.insert(lname.clone(), lv);
          }
        }
      }

      if let Some(tp) = child(&s, "text-properties") {
        let mut props = parse_text_properties(&tp);
        if let Some(v) = get_attr_local(&tp, "font-name") {
          if v.to_ascii_lowercase().contains("courier") || v.to_ascii_lowercase().contains("mono") {
            props.code = true;
          }
          out.text_font_name.insert(lname.clone(), v.to_string());
        }
        out.paragraph_text_props.insert(lname.clone(), props);
      }
    } else if family == "text" {
      if let Some(tp) = child(&s, "text-properties") {
        let mut props = parse_text_properties(&tp);
        if let Some(v) = get_attr_local(&tp, "font-name") {
          if v.to_ascii_lowercase().contains("courier") || v.to_ascii_lowercase().contains("mono") {
            props.code = true;
          }
          out.text_font_name.insert(lname.clone(), v.to_string());
        }
        out.text_props.insert(lname.clone(), props);
      }
    } else if family == "list" {
      let is_ordered = s
        .children()
        .filter(|n| n.is_element())
        .any(|child_n| is_tag(&child_n, "list-level-style-number"));
      out.list_is_ordered.insert(lname.clone(), is_ordered);
    }
  }

  for ls in doc.descendants().filter(|n| is_tag(n, "list-style")) {
    if let Some(name) = get_attr_local(&ls, "name") {
      let is_ordered = ls
        .children()
        .filter(|n| n.is_element())
        .any(|c| is_tag(&c, "list-level-style-number"));
      out.list_is_ordered.insert(name.to_string(), is_ordered);
    }
  }
}

fn parse_text_properties(tp: &Node) -> TextStyleProps {
  let mut props = TextStyleProps::default();

  if let Some(v) = get_attr_local(tp, "font-weight") {
    if v.eq_ignore_ascii_case("bold") {
      props.bold = true;
    }
  }
  if let Some(v) = get_attr_local(tp, "font-style") {
    if v.eq_ignore_ascii_case("italic") {
      props.italic = true;
    }
  }
  if let Some(v) = get_attr_local(tp, "text-line-through-type")
    .or_else(|| get_attr_local(tp, "text-line-through-style"))
  {
    if v != "none" {
      props.strike = true;
    }
  }
  if let Some(v) = get_attr_local(tp, "text-position") {
    let lv = v.to_ascii_lowercase();
    if lv.contains("sup") || lv.contains("super") {
      props.sup = true;
    } else if lv.contains("sub") {
      props.sub = true;
    }
  }
  props
}

fn read_meta<R: Read + Seek>(zip: &mut ZipArchive<R>) -> Option<DocumentMetadata> {
  let text = read_zip_text(zip, "meta.xml")?;
  let xml = XmlDoc::parse(strip_bom(&text)).ok()?;
  let mut meta = DocumentMetadata::default();

  if let Some(title) = xml
    .descendants()
    .find(|n| is_tag(n, "title"))
    .and_then(|n| n.text())
  {
    if !title.trim().is_empty() {
      meta.title = Some(title.to_string());
    }
  }

  if let Some(author) = xml
    .descendants()
    .find(|n| is_tag(n, "creator"))
    .and_then(|n| n.text())
    .or_else(|| {
      xml
        .descendants()
        .find(|n| is_tag(n, "initial-creator"))
        .and_then(|n| n.text())
    })
  {
    let trimmed = author.trim();
    if !trimmed.is_empty() && !trimmed.eq_ignore_ascii_case("unknown") {
      meta.author = Some(trimmed.to_string());
    }
  }

  if let Some(created) = xml
    .descendants()
    .find(|n| is_tag(n, "creation-date"))
    .and_then(|n| n.text())
  {
    if let Ok(dt) = chrono::DateTime::parse_from_rfc3339(created) {
      meta.created = Some(DateTime::<Utc>::from(dt));
    }
  }

  Some(meta)
}

fn is_tag(node: &Node, local: &str) -> bool {
  node.is_element() && node.tag_name().name() == local
}

fn get_attr_local<'a>(node: &Node<'a, 'a>, local: &str) -> Option<&'a str> {
  node
    .attributes()
    .find(|a| {
      let name = a.name();
      match name.rsplit_once(':') {
        Some((_, l)) => l == local,
        None => name == local,
      }
    })
    .map(|a| a.value())
}

fn child<'a>(node: &Node<'a, 'a>, local: &str) -> Option<Node<'a, 'a>> {
  node
    .children()
    .find(|n| n.is_element() && n.tag_name().name() == local)
}

fn children<'a, 'b>(
  node: &Node<'a, 'a>,
  local: &'b str,
) -> impl Iterator<Item = Node<'a, 'a>> + use<'a, 'b> {
  node
    .children()
    .filter(move |n| n.is_element() && n.tag_name().name() == local)
}

fn parse_block_children_odt<R: Read + Seek>(
  node: &Node,
  styles: &OdtStylesInfo,
  notes: &mut Vec<Note>,
  comments: &mut Vec<Comment>,
  zip: &mut ZipArchive<R>,
) -> Vec<Block> {
  let mut blocks: Vec<Block> = Vec::new();

  for child_n in node.children().filter(|n| n.is_element()) {
    if is_tag(&child_n, "h") {
      if let Some(p) = parse_paragraph(&child_n, styles, notes, comments) {
        if paragraph_has_visible_content(&p) {
          blocks.push(Block::Paragraph(p));
        }
      }
    } else if is_tag(&child_n, "p") {
      if let Some(img) = image_from_paragraph(&child_n, zip) {
        blocks.push(Block::Image(img));
      } else if let Some(p) = parse_paragraph(&child_n, styles, notes, comments) {
        if paragraph_has_visible_content(&p) {
          blocks.push(Block::Paragraph(p));
        }
      }
    } else if is_tag(&child_n, "list") {
      let mut effective = child_n;
      let mut inherited_style_name = get_attr_local(&effective, "style-name");
      let mut unwrapped = false;

      while let Some(inner) = unwrap_single_nested_list(&effective) {
        effective = inner;
        unwrapped = true;
        if inherited_style_name.is_none() {
          inherited_style_name = get_attr_local(&effective, "style-name");
        }
      }

      if is_heading_list(&effective) {
        for li in children(&effective, "list-item") {
          if let Some(h) = li.descendants().find(|n| is_tag(n, "h")) {
            if let Some(p) = parse_paragraph(&h, styles, notes, comments) {
              if paragraph_has_visible_content(&p) {
                blocks.push(Block::Paragraph(p));
              }
            }
          }
        }
      } else if let Some(l) = parse_list_with_inherit(
        &effective,
        styles,
        notes,
        comments,
        zip,
        inherited_style_name,
      ) {
        if unwrapped {
          if let Some(Block::List(prev)) = blocks.last_mut() {
            if let Some(last_item) = prev.items.last_mut() {
              last_item.blocks.push(Block::List(l));
              continue;
            }
          }
        }
        blocks.push(Block::List(l));
      }
    } else if is_tag(&child_n, "table") {
      if let Some(t) = parse_table(&child_n, styles, notes, comments, zip) {
        blocks.push(Block::Table(t));
      }
    } else {
      let mut inner = parse_block_children_odt(&child_n, styles, notes, comments, zip);
      blocks.append(&mut inner);
    }
  }

  blocks
}

fn unwrap_single_nested_list<'a>(list: &Node<'a, 'a>) -> Option<Node<'a, 'a>> {
  let mut li_iter = children(list, "list-item");
  let first_li = li_iter.next()?;
  if li_iter.next().is_some() {
    return None;
  }
  let mut inner_lists = first_li.children().filter(|n| is_tag(n, "list"));
  let inner = inner_lists.next()?;
  if inner_lists.next().is_some() {
    return None;
  }
  Some(inner)
}

fn is_heading_list(list: &Node) -> bool {
  let mut any = false;
  for li in children(list, "list-item") {
    any = true;
    if !li.descendants().any(|n| is_tag(&n, "h")) {
      return false;
    }
  }
  any
}

fn parse_paragraph(
  node: &Node,
  styles: &OdtStylesInfo,
  notes: &mut Vec<Note>,
  comments: &mut Vec<Comment>,
) -> Option<Paragraph> {
  let kind = paragraph_kind(node, styles);
  let base = paragraph_text_props(node, styles);
  let inlines = parse_inlines_with_base(node, styles, notes, comments, base);
  Some(Paragraph { kind, inlines })
}

fn paragraph_kind(p: &Node, styles: &OdtStylesInfo) -> ParagraphKind {
  if p.tag_name().name() == "h" {
    if let Some(ol) = get_attr_local(p, "outline-level") {
      if let Ok(v) = ol.parse::<u8>() {
        return ParagraphKind::Heading(v.min(6));
      }
    }
    return ParagraphKind::Heading(1);
  }

  if let Some(style_name) = get_attr_local(p, "style-name") {
    if let Some(lvl) = styles.paragraph_outline_level.get(style_name) {
      return ParagraphKind::Heading((*lvl).min(6));
    }

    let name = styles
      .paragraph_names
      .get(style_name)
      .map(|s| s.to_ascii_lowercase())
      .unwrap_or_default();
    if name.contains("quote") {
      return ParagraphKind::Blockquote;
    }
  }

  ParagraphKind::Normal
}

fn parse_odt_heading_level(style_name: &str) -> Option<u8> {
  let normalized = style_name.replace("_20_", " ").replace('_', " ");
  let lower = normalized.to_ascii_lowercase();
  if lower.contains("title") {
    return Some(1);
  }

  if let Some(idx) = lower.find("heading") {
    let tail = &lower[idx + "heading".len()..];
    let num: String = tail.chars().filter(|c| c.is_ascii_digit()).collect();
    if let Ok(n) = num.parse::<u8>() {
      return Some(n.clamp(1, 6));
    }
  }
  None
}

fn paragraph_text_props(node: &Node, styles: &OdtStylesInfo) -> TextStyleProps {
  if let Some(style_name) = get_attr_local(node, "style-name") {
    if let Some(p) = styles.paragraph_text_props.get(style_name) {
      return *p;
    }
  }
  TextStyleProps::default()
}

fn parse_inlines(
  node: &Node,
  styles: &OdtStylesInfo,
  notes: &mut Vec<Note>,
  comments: &mut Vec<Comment>,
) -> Vec<Inline> {
  let mut out: Vec<Inline> = Vec::new();

  for c in node.children() {
    if c.is_text() {
      if let Some(t) = c.text() {
        if !t.is_empty() {
          out.push(Inline::Text(t.to_string()));
        }
      }
      continue;
    }
    if !c.is_element() {
      continue;
    }

    if is_tag(&c, "span") {
      let mut inner = parse_inlines(&c, styles, notes, comments);
      let sname = get_attr_local(&c, "style-name").map(|s| s.to_string());
      inner = apply_text_style_wrappers(inner, sname.as_deref(), styles, TextStyleProps::default());
      out.extend(inner);
    } else if is_tag(&c, "a") {
      if let Some(href) = get_attr_local(&c, "href") {
        let children = parse_inlines(&c, styles, notes, comments);
        out.push(Inline::Link {
          href: href.to_string(),
          children,
        });
      } else {
        out.extend(parse_inlines(&c, styles, notes, comments));
      }
    } else if is_tag(&c, "line-break") {
      out.push(Inline::LineBreak);
    } else if is_tag(&c, "s") {
      let count = get_attr_local(&c, "c")
        .and_then(|v| v.parse::<usize>().ok())
        .unwrap_or(1);
      out.push(Inline::Text(" ".repeat(count)));
    } else if is_tag(&c, "tab") {
      out.push(Inline::Text("\t".to_string()));
    } else if is_tag(&c, "bookmark-start") {
      if let Some(name) = get_attr_local(&c, "name") {
        out.push(Inline::Bookmark(BookmarkId(name.to_string())));
      }
    } else if is_tag(&c, "note") {
      let kind = match get_attr_local(&c, "note-class") {
        Some("endnote") => NoteKind::Endnote,
        _ => NoteKind::Footnote,
      };
      let id = get_attr_local(&c, "id")
        .map(|s| s.to_string())
        .unwrap_or_else(|| format!("odt-note-{}", notes.len() + 1));
      let body = child(&c, "note-body");
      let mut blocks: Vec<Block> = Vec::new();
      if let Some(b) = body {
        blocks = parse_note_body_blocks(&b, styles, notes, comments);
      }
      notes.push(Note {
        id: NoteId(id.clone()),
        kind,
        blocks,
      });
      match kind {
        NoteKind::Footnote => out.push(Inline::FootnoteRef(NoteId(id))),
        NoteKind::Endnote => out.push(Inline::EndnoteRef(NoteId(id))),
      }
    } else if is_tag(&c, "annotation") {
      let cid = format!("odt-comment-{}", comments.len() + 1);
      let mut author: Option<String> = None;
      let mut initials: Option<String> = None;

      if let Some(a) = c
        .descendants()
        .find(|n| is_tag(n, "creator"))
        .and_then(|n| n.text())
      {
        if !a.trim().is_empty() {
          author = Some(a.to_string());
        }
      }
      if let Some(init) = c
        .descendants()
        .find(|n| is_tag(n, "initials"))
        .and_then(|n| n.text())
      {
        if !init.trim().is_empty() {
          initials = Some(init.to_string());
        }
      }

      let mut cblocks: Vec<Block> = Vec::new();
      for p in c.children().filter(|n| is_tag(n, "p")) {
        let inl = parse_inlines(&p, styles, notes, comments);
        if !inl.is_empty() {
          cblocks.push(Block::Paragraph(Paragraph {
            kind: ParagraphKind::Normal,
            inlines: inl,
          }));
        }
      }
      comments.push(Comment {
        id: CommentId(cid.clone()),
        author_name: author,
        author_initials: initials,
        blocks: cblocks,
      });
      out.push(Inline::CommentRef(CommentId(cid)));
    } else {
      out.extend(parse_inlines(&c, styles, notes, comments));
    }
  }

  out
}

fn parse_inlines_with_base(
  node: &Node,
  styles: &OdtStylesInfo,
  notes: &mut Vec<Note>,
  comments: &mut Vec<Comment>,
  base: TextStyleProps,
) -> Vec<Inline> {
  let mut inlines = parse_inlines(node, styles, notes, comments);
  inlines = apply_text_style_wrappers(inlines, None, styles, base);
  inlines
}

fn apply_text_style_wrappers(
  mut inlines: Vec<Inline>,
  style_name: Option<&str>,
  styles: &OdtStylesInfo,
  base: TextStyleProps,
) -> Vec<Inline> {
  let mut props = base;
  if let Some(name) = style_name {
    let lower = name.to_ascii_lowercase();
    let mut sprops = styles.text_props.get(name).copied().unwrap_or_default();
    if lower.contains("code")
      || styles
        .text_font_name
        .get(name)
        .map(|f| {
          f.to_ascii_lowercase().contains("courier") || f.to_ascii_lowercase().contains("mono")
        })
        .unwrap_or(false)
    {
      sprops.code = true;
    }
    props.bold |= sprops.bold;
    props.italic |= sprops.italic;
    props.strike |= sprops.strike;
    props.sup |= sprops.sup;
    props.sub |= sprops.sub;
    props.code |= sprops.code;
  }

  if props.code {
    let code_text: String = inlines
      .iter()
      .filter_map(|i| match i {
        Inline::Text(s) => Some(s.as_str()),
        _ => None,
      })
      .collect();
    if !code_text.is_empty() {
      return vec![Inline::Code(code_text)];
    }
  }

  if props.strike {
    inlines = vec![Inline::Del(inlines)];
  }
  if props.italic {
    inlines = vec![Inline::Em(inlines)];
  }
  if props.bold {
    inlines = vec![Inline::Strong(inlines)];
  }
  if props.sup {
    inlines = vec![Inline::Sup(inlines)];
  }
  if props.sub {
    inlines = vec![Inline::Sub(inlines)];
  }
  inlines
}

fn parse_note_body_blocks(
  node: &Node,
  styles: &OdtStylesInfo,
  notes: &mut Vec<Note>,
  comments: &mut Vec<Comment>,
) -> Vec<Block> {
  let mut blocks = Vec::new();
  for p in node.children().filter(|n| is_tag(n, "p") || is_tag(n, "h")) {
    let kind = paragraph_kind(&p, styles);
    let base = paragraph_text_props(&p, styles);
    let inl = parse_inlines_with_base(&p, styles, notes, comments, base);
    if inlines_have_visible_content(&inl) {
      blocks.push(Block::Paragraph(Paragraph { kind, inlines: inl }));
    }
  }
  blocks
}

fn paragraph_has_visible_content(p: &Paragraph) -> bool {
  inlines_have_visible_content(&p.inlines)
}

fn inlines_have_visible_content(inlines: &[Inline]) -> bool {
  inlines.iter().any(inline_is_visible)
}

fn inline_is_visible(i: &Inline) -> bool {
  match i {
    Inline::Text(t) => !t.trim().is_empty(),
    Inline::LineBreak => false,
    Inline::Link { children, .. } => inlines_have_visible_content(children),
    Inline::Strong(c) | Inline::Em(c) | Inline::Del(c) | Inline::Sup(c) | Inline::Sub(c) => {
      inlines_have_visible_content(c)
    }
    Inline::Code(c) => !c.trim().is_empty(),
    Inline::FootnoteRef(_) | Inline::EndnoteRef(_) | Inline::CommentRef(_) => true,
    Inline::Bookmark(_) => false,
  }
}

fn parse_list_with_inherit<R: Read + Seek>(
  node: &Node,
  styles: &OdtStylesInfo,
  notes: &mut Vec<Note>,
  comments: &mut Vec<Comment>,
  zip: &mut ZipArchive<R>,
  inherit_style_name: Option<&str>,
) -> Option<List> {
  let style_name = get_attr_local(node, "style-name").or(inherit_style_name);
  let list_type = match style_name
    .and_then(|n| styles.list_is_ordered.get(n))
    .copied()
  {
    Some(true) => ListType::Ordered,
    Some(false) => ListType::Unordered,
    None => ListType::Unordered,
  };

  let mut items: Vec<ListItem> = Vec::new();
  for it in children(node, "list-item") {
    let mut blocks = Vec::new();
    let mut inner = parse_block_children_odt(&it, styles, notes, comments, zip);
    blocks.append(&mut inner);
    items.push(ListItem { blocks });
  }
  Some(List { items, list_type })
}

fn parse_table<R: Read + Seek>(
  node: &Node,
  styles: &OdtStylesInfo,
  notes: &mut Vec<Note>,
  comments: &mut Vec<Comment>,
  zip: &mut ZipArchive<R>,
) -> Option<Table> {
  let mut rows: Vec<TableRow> = Vec::new();
  for tr in children(node, "table-row") {
    let mut cells: Vec<TableCell> = Vec::new();
    for tc in children(&tr, "table-cell") {
      let mut blocks = parse_block_children_odt(&tc, styles, notes, comments, zip);
      let colspan = get_attr_local(&tc, "number-columns-spanned")
        .and_then(|v| v.parse::<u32>().ok())
        .and_then(NonZeroU32::new)
        .unwrap_or_else(|| NonZeroU32::new(1).unwrap());
      let rowspan = get_attr_local(&tc, "number-rows-spanned")
        .and_then(|v| v.parse::<u32>().ok())
        .and_then(NonZeroU32::new)
        .unwrap_or_else(|| NonZeroU32::new(1).unwrap());
      cells.push(TableCell {
        blocks: std::mem::take(&mut blocks),
        colspan,
        rowspan,
      });
    }
    rows.push(TableRow {
      cells,
      kind: TableRowKind::Body,
    });
  }
  Some(Table { rows })
}

fn image_from_paragraph<R: Read + Seek>(p: &Node, zip: &mut ZipArchive<R>) -> Option<Image> {
  let img = p.descendants().find(|n| is_tag(n, "image"))?;
  let href = get_attr_local(&img, "href")?;
  image_from_href(href, zip, None)
}

fn image_from_href<R: Read + Seek>(
  href: &str,
  _zip: &mut ZipArchive<R>,
  alt: Option<String>,
) -> Option<Image> {
  // only include external images (http/https URLs)
  if href.starts_with("http://") || href.starts_with("https://") {
    return Some(Image {
      src: href.to_string(),
      alt,
    });
  }
  None
}
