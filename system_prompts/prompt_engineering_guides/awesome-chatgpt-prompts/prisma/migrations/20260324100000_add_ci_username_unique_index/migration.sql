-- Add case-insensitive unique indexes to prevent TOCTOU race conditions
-- These ensure the database enforces uniqueness regardless of casing
CREATE UNIQUE INDEX "users_username_ci_unique" ON "users" (LOWER("username"));
CREATE UNIQUE INDEX "users_email_ci_unique" ON "users" (LOWER("email"));
