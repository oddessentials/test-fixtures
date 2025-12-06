-- migration_001_create_items.sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
