import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "@/lib/db";
import { isUniqueConstraintViolation } from "@/lib/db-errors";
import { getConfig } from "@/lib/config";

// Trim before validation to prevent unicode/whitespace tricks that bypass uniqueness checks (e.g. "admin@x.com\u200B" vs "admin@x.com") on certain DBMS
const trimmed = z.preprocess((v) => (typeof v === "string" ? v.trim() : v), z.string());

const registerSchema = z.object({
  name: trimmed.pipe(z.string().min(2)),
  username: trimmed.pipe(z.string().min(1).max(30).regex(/^[a-z0-9_]+$/)),
  email: trimmed.pipe(z.string().email()).transform((v) => v.toLowerCase()),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    // Check if registration is allowed
    const config = await getConfig();
    if (!config.auth.allowRegistration) {
      return NextResponse.json(
        { error: "registration_disabled", message: "Registration is disabled" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_error", message: "Invalid input" },
        { status: 400 }
      );
    }

    const { name, username, email, password } = parsed.data;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Atomic create — DB unique constraints enforce email and CI username uniqueness
    try {
      const user = await db.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword,
        },
      });

      return NextResponse.json({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      if (isUniqueConstraintViolation(error, "email")) {
        return NextResponse.json(
          { error: "email_taken", message: "Email is already taken" },
          { status: 409 }
        );
      }
      if (isUniqueConstraintViolation(error, "username")) {
        return NextResponse.json(
          { error: "username_taken", message: "Username is already taken" },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
