# MySQL Docker Compose Template

Replace `{SERVICE_NAME}` and `{SERVICE_NAME_SNAKE}` with your service name.

```yaml
# local/mysql/docker-compose.yml

services:
  mysql:
    image: mysql:8.0
    platform: linux/arm64
    container_name: ${PROJECT_APP_NAME:-{SERVICE_NAME}}-mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: {SERVICE_NAME_SNAKE}
      MYSQL_USER: appuser
      MYSQL_PASSWORD: apppassword
    ports:
      - "3306:3306"
    volumes:
      - ./initdb.d:/docker-entrypoint-initdb.d
```

## Init Script

```sql
-- local/mysql/initdb.d/01-schema.sql

-- Create your tables here
CREATE TABLE IF NOT EXISTS example (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX idx_example_name ON example(name);
```

## Seed Data (Optional)

```sql
-- local/mysql/initdb.d/02-seed-data.sql

-- Insert test data for local development
INSERT INTO example (id, name) VALUES
    ('test-001', 'Test Example 1'),
    ('test-002', 'Test Example 2');
```
