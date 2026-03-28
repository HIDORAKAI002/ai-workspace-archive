## Database Access

This project provides an MCP server (DBHub) for secure SQL access to the development database.

AI agents can execute SQL queries. In read-only mode (recommended for production):

- `SELECT * FROM users LIMIT 5;`
- `SHOW TABLES;`
- `DESCRIBE table_name;`

In read-write mode (development/testing):

- `INSERT INTO users (name, email) VALUES ('John', 'john@example.com');`
- `UPDATE users SET status = 'active' WHERE id = 1;`
- `CREATE TABLE test_table (id INT PRIMARY KEY);`

Use `--readonly` flag to restrict to read-only operations for safety.
