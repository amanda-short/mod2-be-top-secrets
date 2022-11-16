-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS secrets;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL
);

CREATE TABLE secrets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP
);

--   INSERT INTO secrets (
--     title,
--     description,
--     created_at
-- )
-- VALUES
--   ('Found Documents', 'Classified documents of the foregin minister found in damaged vehicle', yy-MM-dd HH:mm:ss),
--   ('Recording', '48 second recording of a possible plan to intercept a motorcade', yy-MM-dd HH:mm:ss),
--   ('Missing Aircraft', 'Aircraft has been unresponsive over Pacific for 35 minutes', yy-MM-dd HH:mm:ss);
