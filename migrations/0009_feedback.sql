-- Feedback on the onboarding experience, from the Feedback view on the client's
-- page. Only Ryan sees it (the admin page); the client's page never shows it back.

CREATE TABLE feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  rating INTEGER,                      -- 1–5 stars, or NULL if they skipped it
  body TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
CREATE INDEX feedback_client ON feedback(client_id);
