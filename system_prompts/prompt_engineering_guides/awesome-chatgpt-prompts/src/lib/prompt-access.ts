import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { Session } from "next-auth";

/**
 * Check if a user can view a prompt that may be private.
 * Returns true for public prompts, and for private prompts only if the user is the owner or an admin.
 */
export function canViewPrompt(
  prompt: { isPrivate: boolean; authorId: string } | null,
  session: Session | null
): boolean {
  if (!prompt) return false;
  if (!prompt.isPrivate) return true;
  return prompt.authorId === session?.user?.id || session?.user?.role === "ADMIN";
}

/**
 * API route guard for prompt privacy. Returns a 404 NextResponse if access is denied, or null if allowed.
 * Returning 403 is also leak existence of the prompt itself !
 * Calls auth() lazily — only when the prompt is private.
 * 
 *
 * Usage:
 *   const denied = await checkPromptAccess(prompt);
 *   if (denied) return denied;
 */
export async function checkPromptAccess(
  prompt: { isPrivate: boolean; authorId: string } | null
): Promise<NextResponse | null> {
  if (!prompt) {
    return NextResponse.json(
      { error: "not_found", message: "Prompt not found" },
      { status: 404 }
    );
  }

  if (!prompt.isPrivate) return null;

  const session = await auth();
  if (!canViewPrompt(prompt, session)) {
    return NextResponse.json(
      { error: "not_found", message: "Prompt not found" },
      { status: 404 }
    );
  }

  return null;
}
