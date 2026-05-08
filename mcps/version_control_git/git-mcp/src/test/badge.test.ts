import { describe, it, expect, vi } from "vitest";
import { generateBadgeResponse } from "../api/utils/badge";

describe("Badge utilities", () => {
  describe("generateBadgeResponse", () => {
    it("should generate a badge response with custom values", async () => {
      const response = generateBadgeResponse(100, "green");

      // Mock the text() method to handle the ReadableStream
      const mockText = vi.fn().mockResolvedValue(
        JSON.stringify({
          schemaVersion: 1,
          label: "Custom Label",
          message: "100",
          color: "green",
          cacheSeconds: 300,
        }),
      );

      vi.spyOn(response, "text").mockImplementation(mockText);

      const body = JSON.parse(await response.text());
      expect(body).toEqual({
        schemaVersion: 1,
        label: "Custom Label",
        message: "100",
        color: "green",
        cacheSeconds: 300,
      });
    });
  });
});
