use crate::document::model::*;
use crate::document::providers::DocumentProvider;
use calamine::{open_workbook_auto_from_rs, Data, Reader};
use std::error::Error;
use std::io::Cursor;
use std::num::NonZeroU32;

const ONE: NonZeroU32 = unsafe { NonZeroU32::new_unchecked(1) };

pub struct XlsxProvider;

impl XlsxProvider {
  pub fn new() -> Self {
    Self
  }
}

impl DocumentProvider for XlsxProvider {
  fn parse_buffer(&self, data: &[u8]) -> Result<Document, Box<dyn Error + Send + Sync>> {
    let cursor = Cursor::new(data);
    let mut workbook = open_workbook_auto_from_rs(cursor)?;

    let mut blocks: Vec<Block> = Vec::new();

    for sheet_name in workbook.sheet_names() {
      // Add sheet heading
      blocks.push(Block::Paragraph(Paragraph {
        kind: ParagraphKind::Heading(2),
        inlines: vec![Inline::Text(sheet_name.clone())],
      }));

      if let Ok(range) = workbook.worksheet_range(&sheet_name) {
        let mut rows: Vec<TableRow> = Vec::new();
        for r in range.rows() {
          let mut cells: Vec<TableCell> = Vec::new();
          for cell in r {
            let text = data_type_to_string(cell);
            let blocks_in_cell = if text.trim().is_empty() {
              Vec::new()
            } else {
              vec![Block::Paragraph(Paragraph {
                kind: ParagraphKind::Normal,
                inlines: vec![Inline::Text(text)],
              })]
            };
            cells.push(TableCell {
              blocks: blocks_in_cell,
              colspan: ONE,
              rowspan: ONE,
            });
          }
          rows.push(TableRow {
            cells,
            kind: TableRowKind::Body,
          });
        }

        blocks.push(Block::Table(Table { rows }));
      }
    }

    Ok(Document {
      blocks,
      metadata: DocumentMetadata::default(),
      notes: Vec::new(),
      comments: Vec::new(),
    })
  }

  fn name(&self) -> &'static str {
    "xlsx"
  }
}

fn data_type_to_string(cell: &Data) -> String {
  match cell {
    Data::Empty => String::new(),
    Data::String(s) => s.clone(),
    Data::Float(f) => f.to_string(),
    Data::Int(i) => i.to_string(),
    Data::Bool(b) => b.to_string(),
    Data::DateTime(v) => v.to_string(),
    Data::DateTimeIso(v) => v.to_string(),
    Data::DurationIso(v) => v.to_string(),
    Data::Error(e) => format!("#ERROR({e:?})"),
  }
}
