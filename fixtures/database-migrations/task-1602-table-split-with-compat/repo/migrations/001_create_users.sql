-- migration_001_create_users.sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT
);
