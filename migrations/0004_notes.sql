-- Notes from Ryan: longer write-ups than a chat message, shown as an accordion
-- on the client's page. The client acknowledges each one ("Got it"), which
-- collapses it; editing a note after that asks for a fresh acknowledgement.

CREATE TABLE notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  note_date TEXT NOT NULL,             -- YYYY-MM-DD, shown on the note (Ryan can set it)
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,         -- title or text last changed
  acknowledged_at INTEGER,             -- client pressed "Got it"
  archived INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX notes_client ON notes(client_id);
