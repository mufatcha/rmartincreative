-- Files Ryan shares on a client's page, optionally for approval. Each shared
-- item has versions (rows in `files` with review_id set), a comment thread
-- (comments can be pinned to a spot on an image), and approval decisions.

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  title TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  needs_approval INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  archived INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX reviews_client ON reviews(client_id);

-- Versions are files: review_id links them, note says what changed.
ALTER TABLE files ADD COLUMN review_id INTEGER REFERENCES reviews(id);
ALTER TABLE files ADD COLUMN note TEXT NOT NULL DEFAULT '';

CREATE TABLE review_comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  version_id INTEGER NOT NULL REFERENCES files(id),
  client_id INTEGER NOT NULL REFERENCES clients(id),
  author TEXT NOT NULL,                -- client | admin
  body TEXT NOT NULL,
  pin_x REAL,                          -- 0–1 across the image (NULL: not pinned)
  pin_y REAL,                          -- 0–1 down the image
  resolved INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE INDEX review_comments_client ON review_comments(client_id);

-- Approve / request changes, per version. Approvals keep the typed name.
CREATE TABLE review_decisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  review_id INTEGER NOT NULL REFERENCES reviews(id),
  version_id INTEGER NOT NULL REFERENCES files(id),
  client_id INTEGER NOT NULL REFERENCES clients(id),
  decision TEXT NOT NULL,              -- approved | changes
  name TEXT NOT NULL DEFAULT '',       -- typed by the client when approving
  note TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
CREATE INDEX review_decisions_client ON review_decisions(client_id);
