import { describe, expect, test } from "vitest";
import {
  asFiniteNumber,
  asFiniteNumberInRange,
  asSafeIntegerInRange,
  parseFiniteNumber,
} from "./number-coercion.js";

describe("number-coercion", () => {
  test("asFiniteNumber accepts only finite numbers", () => {
    expect(asFiniteNumber(4)).toBe(4);
    expect(asFiniteNumber("4")).toBeUndefined();
    expect(asFiniteNumber(Number.NaN)).toBeUndefined();
    expect(asFiniteNumber(Number.POSITIVE_INFINITY)).toBeUndefined();
  });

  test("asFiniteNumberInRange enforces inclusive and exclusive bounds", () => {
    expect(asFiniteNumberInRange(0.5, { min: 0.5, max: 2 })).toBe(0.5);
    expect(asFiniteNumberInRange(2, { min: 0.5, max: 2 })).toBe(2);
    expect(asFiniteNumberInRange(0.5, { min: 0.5, minExclusive: true })).toBeUndefined();
    expect(asFiniteNumberInRange(10, { max: 10, maxExclusive: true })).toBeUndefined();
    expect(asFiniteNumberInRange("1", { min: 0, max: 2 })).toBeUndefined();
  });

  test("asSafeIntegerInRange accepts only safe integers inside inclusive bounds", () => {
    expect(asSafeIntegerInRange(-1, { min: -1, max: 10 })).toBe(-1);
    expect(asSafeIntegerInRange(10, { min: -1, max: 10 })).toBe(10);
    expect(asSafeIntegerInRange(1.5, { min: -1, max: 10 })).toBeUndefined();
    expect(asSafeIntegerInRange(11, { min: -1, max: 10 })).toBeUndefined();
    expect(asSafeIntegerInRange(Number.NaN, { min: -1, max: 10 })).toBeUndefined();
  });

  test("parseFiniteNumber accepts finite numbers and numeric strings", () => {
    expect(parseFiniteNumber(4)).toBe(4);
    expect(parseFiniteNumber("4.5")).toBe(4.5);
    expect(parseFiniteNumber("4.5ms")).toBeUndefined();
    expect(parseFiniteNumber("")).toBeUndefined();
    expect(parseFiniteNumber("nope")).toBeUndefined();
  });
});
