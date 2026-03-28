import { Prisma } from "@prisma/client";

/**
 * Check if a Prisma error is a unique constraint violation (P2002)
 * on a specific field.
 *
 * Prisma reports column-level constraints as ["fieldName"] and
 * raw index constraints as ["table_field_unique"], so we match both.
 */
export function isUniqueConstraintViolation(
  error: unknown,
  field: string,
): boolean {
  if (
    !(error instanceof Prisma.PrismaClientKnownRequestError) ||
    error.code !== "P2002"
  ) {
    return false;
  }

  const target = error.meta?.target;

  if (Array.isArray(target)) {
    return target.some(
      (t: string) => t === field || t.includes(field),
    );
  }

  return typeof target === "string" && target.includes(field);
}
