import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isUniqueConstraintViolation } from "@/lib/db-errors";

const customLinkSchema = z.object({
  type: z.enum(["website", "github", "twitter", "linkedin", "instagram", "youtube", "twitch", "discord", "mastodon", "bluesky", "sponsor"]),
  url: z.string().url(),
  label: z.string().max(30).optional(),
});

// Trim before validation to prevent unicode/whitespace tricks that bypass uniqueness checks (e.g. "admin\u200B@x.com" vs "admin@x.com")
const trimmed = z.preprocess((v) => (typeof v === "string" ? v.trim() : v), z.string());

const updateProfileSchema = z.object({
  name: trimmed.pipe(z.string().min(1).max(100)),
  username: trimmed.pipe(z.string().min(1).max(30).regex(/^[a-z0-9_]+$/)),
  avatar: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(250).optional().or(z.literal("")),
  customLinks: z.array(customLinkSchema).max(5).optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "unauthorized", message: "You must be logged in" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_error", message: "Invalid input", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const { name, username, avatar, bio, customLinks } = parsed.data;

    // Atomic update — DB-level CI unique index prevents collisions
    try {
      const user = await db.user.update({
        where: { id: session.user.id },
        data: {
          name,
          username,
          avatar: avatar || null,
          bio: bio || null,
          customLinks: customLinks && customLinks.length > 0 ? customLinks : Prisma.DbNull,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          avatar: true,
          bio: true,
          customLinks: true,
        },
      });

      return NextResponse.json(user);
    } catch (error) {
      if (isUniqueConstraintViolation(error, "username")) {
        return NextResponse.json(
          { error: "username_taken", message: "This username is already taken" },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "unauthorized", message: "You must be logged in" },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "not_found", message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
