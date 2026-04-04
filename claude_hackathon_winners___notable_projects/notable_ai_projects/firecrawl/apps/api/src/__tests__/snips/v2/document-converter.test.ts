import path from "path";
import fs from "fs";
import { DocumentConverter, DocumentType } from "@mendable/firecrawl-rs";

describe("Document Converter tests", () => {
  const samplesDir = path.join(process.cwd(), "samples");

  const expectedHtmlBase = (documentText: string) =>
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><main><p><strong>Hello!</strong></p><p>${documentText} file to test the Firecrawl Document Converter.</p><p><em>Italic</em></p><p><strong>Bold</strong></p><p>Underlined</p><p><del>Strikethrough</del></p><table><tbody><tr><td>Header 1</td><td>Header 2</td></tr><tr><td>Value 1</td><td>Value 2</td></tr></tbody></table></main></body></html>`;

  const sampleFiles = [
    { file: "sample.docx", type: DocumentType.Docx, name: "DOCX" },
    { file: "sample.odt", type: DocumentType.Odt, name: "ODT" },
    { file: "sample.rtf", type: DocumentType.Rtf, name: "RTF" },
  ];

  const converter = new DocumentConverter();

  describe.each(sampleFiles)(
    "$name document conversion",
    ({ file, type, name }) => {
      const filePath = path.join(samplesDir, file);

      beforeAll(() => {
        if (!fs.existsSync(filePath)) {
          throw new Error(`Sample file ${filePath} does not exist`);
        }
      });

      it.concurrent(
        `should convert ${name} document and return expected HTML`,
        async () => {
          const fileBuffer = fs.readFileSync(filePath);

          const html = await converter.convertBufferToHtml(
            new Uint8Array(fileBuffer),
            type,
          );

          expect(html).toBe(expectedHtmlBase(name));
        },
        10000,
      );
    },
  );

  describe("XLSX document conversion", () => {
    const expectedHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><main><h2>Sheet1</h2><table><tbody><tr><td>sample file</td><td>test</td></tr><tr><td></td><td></td></tr><tr><td>Name</td><td>Price</td></tr><tr><td>iPhone</td><td>1000</td></tr><tr><td>iPad</td><td>800</td></tr><tr><td>Macbook</td><td>1200</td></tr></tbody></table><h2>Sheet2</h2><table><tbody><tr><td>other tab</td><td></td></tr><tr><td></td><td></td></tr><tr><td>Name</td><td>Price</td></tr><tr><td>ChatGPT</td><td>20</td></tr><tr><td>Claude</td><td>17</td></tr><tr><td>Perplexity</td><td>20</td></tr></tbody></table></main></body></html>`;

    it("should convert XLSX document and return expected HTML", async () => {
      const filePath = path.join(samplesDir, "sample.xlsx");
      const fileBuffer = fs.readFileSync(filePath);
      const html = await converter.convertBufferToHtml(
        new Uint8Array(fileBuffer),
        DocumentType.Xlsx,
      );
      expect(html).toBe(expectedHtml);
    });
  });
});
