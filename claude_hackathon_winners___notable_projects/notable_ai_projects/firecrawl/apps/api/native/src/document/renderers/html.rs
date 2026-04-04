use crate::document::model::*;
use maud::{html, Markup, DOCTYPE};

pub struct HtmlRenderer;

impl HtmlRenderer {
  pub fn new() -> Self {
    Self
  }

  pub fn render(&self, document: &Document) -> String {
    let title = document.metadata.title.as_deref().unwrap_or("Document");

    let footnotes: Vec<&Note> = document
      .notes
      .iter()
      .filter(|n| matches!(n.kind, NoteKind::Footnote))
      .collect();

    let endnotes: Vec<&Note> = document
      .notes
      .iter()
      .filter(|n| matches!(n.kind, NoteKind::Endnote))
      .collect();

    let author = document.metadata.author.as_deref();
    let page: Markup = html! {
        (DOCTYPE)
        html lang="en" {
            head {
                meta charset="UTF-8";
                meta name="viewport" content="width=device-width, initial-scale=1.0";
                title { (title) }
                @if let Some(author) = author {
                    meta name="author" content=(author);
                }
            }
            body {
                main { (self.render_blocks(&document.blocks)) }

                @if !footnotes.is_empty() {
                    section id="footnotes" {
                        h2 { "Footnotes" }
                        @for footnote in &footnotes {
                            div id={ "footnote-" (&footnote.id.0) } {
                                (self.render_blocks(&footnote.blocks))
                            }
                        }
                    }
                }

                @if !endnotes.is_empty() {
                    section id="endnotes" {
                        h2 { "Endnotes" }
                        @for endnote in &endnotes {
                            div id={ "endnote-" (&endnote.id.0) } {
                                (self.render_blocks(&endnote.blocks))
                            }
                        }
                    }
                }

                @if !document.comments.is_empty() {
                    section id="comments" {
                        h2 { "Comments" }
                        @for comment in &document.comments {
                            article id={ "comment-" (&comment.id.0) } {
                                @if let Some(author) = &comment.author_name {
                                    header {
                                        (author)
                                        @if let Some(initials) = &comment.author_initials {
                                            " (" (initials) ")"
                                        }
                                    }
                                }
                                (self.render_blocks(&comment.blocks))
                            }
                        }
                    }
                }
            }
        }
    };

    page.into_string()
  }

  fn render_blocks(&self, blocks: &[Block]) -> Markup {
    html! {
        @for b in blocks {
            @match b {
                Block::Paragraph(p) => { (self.render_paragraph(p)) }
                Block::Table(t)      => { (self.render_table(t)) }
                Block::List(l)       => { (self.render_list(l)) }
                Block::Image(i)      => { (self.render_image(i)) }
            }
        }
    }
  }

  fn render_blocks_inline(&self, blocks: &[Block]) -> Markup {
    if blocks.len() == 1 {
      if let Block::Paragraph(p) = &blocks[0] {
        if matches!(p.kind, ParagraphKind::Normal) {
          return self.render_inlines(&p.inlines);
        }
      }
    }

    self.render_blocks(blocks)
  }

  fn render_paragraph(&self, p: &Paragraph) -> Markup {
    match p.kind {
      ParagraphKind::Normal => html! { p { (self.render_inlines(&p.inlines)) } },
      ParagraphKind::Blockquote => html! {
          blockquote { p { (self.render_inlines(&p.inlines)) } }
      },
      ParagraphKind::Heading(level) => match level {
        1 => html! { h1 { (self.render_inlines(&p.inlines)) } },
        2 => html! { h2 { (self.render_inlines(&p.inlines)) } },
        3 => html! { h3 { (self.render_inlines(&p.inlines)) } },
        4 => html! { h4 { (self.render_inlines(&p.inlines)) } },
        5 => html! { h5 { (self.render_inlines(&p.inlines)) } },
        _ => html! { h6 { (self.render_inlines(&p.inlines)) } },
      },
    }
  }

  fn render_table(&self, t: &Table) -> Markup {
    let mut head_rows = Vec::new();
    let mut body_rows = Vec::new();
    let mut foot_rows = Vec::new();

    for row in &t.rows {
      match row.kind {
        TableRowKind::Header => head_rows.push(row),
        TableRowKind::Body => body_rows.push(row),
        TableRowKind::Footer => foot_rows.push(row),
      }
    }

    html! {
        table {
            @if !head_rows.is_empty() {
                thead { @for row in head_rows { (self.render_table_row(row, true)) } }
            }
            tbody { @for row in body_rows { (self.render_table_row(row, false)) } }
            @if !foot_rows.is_empty() {
                tfoot { @for row in foot_rows { (self.render_table_row(row, false)) } }
            }
        }
    }
  }

  fn render_table_row(&self, row: &TableRow, header: bool) -> Markup {
    html! {
        tr {
            @for cell in &row.cells {
                @let cs = cell.colspan.get();
                @let rs = cell.rowspan.get();
                @let cs_attr = if cs > 1 { Some(cs) } else { None };
                @let rs_attr = if rs > 1 { Some(rs) } else { None };

                @if header {
                    @if let (Some(cs), Some(rs)) = (cs_attr, rs_attr) {
                        th colspan=(cs) rowspan=(rs) { (self.render_blocks_inline(&cell.blocks)) }
                    } @else if let Some(cs) = cs_attr {
                        th colspan=(cs) { (self.render_blocks_inline(&cell.blocks)) }
                    } @else if let Some(rs) = rs_attr {
                        th rowspan=(rs) { (self.render_blocks_inline(&cell.blocks)) }
                    } @else {
                        th { (self.render_blocks_inline(&cell.blocks)) }
                    }
                } @else {
                    @if let (Some(cs), Some(rs)) = (cs_attr, rs_attr) {
                        td colspan=(cs) rowspan=(rs) { (self.render_blocks_inline(&cell.blocks)) }
                    } @else if let Some(cs) = cs_attr {
                        td colspan=(cs) { (self.render_blocks_inline(&cell.blocks)) }
                    } @else if let Some(rs) = rs_attr {
                        td rowspan=(rs) { (self.render_blocks_inline(&cell.blocks)) }
                    } @else {
                        td { (self.render_blocks_inline(&cell.blocks)) }
                    }
                }
            }
        }
    }
  }

  fn render_list(&self, l: &List) -> Markup {
    match l.list_type {
      ListType::Ordered => html! {
          ol { @for item in &l.items { li { (self.render_blocks_inline(&item.blocks)) } } }
      },
      ListType::Unordered => html! {
          ul { @for item in &l.items { li { (self.render_blocks_inline(&item.blocks)) } } }
      },
    }
  }

  fn render_image(&self, i: &Image) -> Markup {
    match &i.alt {
      Some(alt) => html! { img src=(i.src) alt=(alt); },
      None => html! { img src=(i.src); },
    }
  }

  fn render_inlines(&self, inlines: &[Inline]) -> Markup {
    html! { @for inline in inlines { (self.render_inline(inline)) } }
  }

  fn render_inline(&self, inline: &Inline) -> Markup {
    match inline {
      Inline::Text(t) => html! { (t) },
      Inline::LineBreak => html! { br; },

      Inline::Link { href, children } => {
        html! { a href=(href) { (self.render_inlines(children)) } }
      }

      Inline::Strong(children) => html! { strong { (self.render_inlines(children)) } },
      Inline::Em(children) => html! { em { (self.render_inlines(children)) } },
      Inline::Del(children) => html! { del { (self.render_inlines(children)) } },
      Inline::Code(code) => html! { code { (code) } },
      Inline::Sup(children) => html! { sup { (self.render_inlines(children)) } },
      Inline::Sub(children) => html! { sub { (self.render_inlines(children)) } },

      Inline::FootnoteRef(id) => {
        html! { sup { a href={ "#footnote-" (&id.0) } { (&id.0) } } }
      }
      Inline::EndnoteRef(id) => html! { sup { a href={ "#endnote-" (&id.0) } { (&id.0) } } },
      Inline::CommentRef(id) => html! { a href={ "#comment-" (&id.0) } { "💬" } },
      Inline::Bookmark(id) => html! { a id=(&id.0) {} },
    }
  }
}
