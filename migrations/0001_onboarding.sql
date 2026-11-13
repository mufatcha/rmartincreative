-- Client onboarding pages (app/start). Times are Unix milliseconds.
-- Apply: bunx wrangler d1 migrations apply onboarding --local (or --remote)

CREATE TABLE clients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,           -- the private link: /start/<slug>
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',      -- where "new message / new request" emails go
  intro TEXT NOT NULL DEFAULT '',      -- welcome note at the top of the page
  created_at INTEGER NOT NULL,
  invited_at INTEGER,                  -- link emailed; client emails start after this or a first visit
  last_seen_at INTEGER,                -- client last had the page open and visible
  client_read_at INTEGER,              -- client last saw the chat
  admin_read_at INTEGER,               -- admin last saw the chat
  archived INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  title TEXT NOT NULL,
  sort INTEGER NOT NULL DEFAULT 0,
  archived INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX sections_client ON sections(client_id);

-- kind: question | task | upload | note
-- field_type (questions): text | textarea | select | radio | checkboxes | date | url | email | phone
CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  section_id INTEGER NOT NULL REFERENCES sections(id),
  kind TEXT NOT NULL,
  title TEXT NOT NULL,
  help TEXT NOT NULL DEFAULT '',
  field_type TEXT NOT NULL DEFAULT 'text',
  options_json TEXT NOT NULL DEFAULT '[]',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  archived INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX items_client ON items(client_id);

-- One row per question, replaced on every autosave.
CREATE TABLE responses (
  item_id INTEGER PRIMARY KEY REFERENCES items(id),
  client_id INTEGER NOT NULL REFERENCES clients(id),
  value_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX responses_client ON responses(client_id);

CREATE TABLE task_status (
  item_id INTEGER PRIMARY KEY REFERENCES items(id),
  client_id INTEGER NOT NULL REFERENCES clients(id),
  done INTEGER NOT NULL,
  done_by TEXT NOT NULL,               -- client | admin
  updated_at INTEGER NOT NULL
);
CREATE INDEX task_status_client ON task_status(client_id);

CREATE TABLE files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  item_id INTEGER REFERENCES items(id), -- the upload request it answers (NULL: general files)
  uploaded_by TEXT NOT NULL DEFAULT 'client',
  r2_key TEXT NOT NULL,
  name TEXT NOT NULL,
  size INTEGER NOT NULL,
  type TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL,
  deleted INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX files_client ON files(client_id);

CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  sender TEXT NOT NULL,                -- client | admin
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX messages_client ON messages(client_id, created_at);

-- Activity, for the notification emails and the admin activity feed.
-- notified_at is set once the other side has been emailed (or has seen it).
-- type: answer | task | file | message | request
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  actor TEXT NOT NULL,                 -- client | admin
  type TEXT NOT NULL,
  ref_id INTEGER,                      -- item, file, or message id
  summary TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  notified_at INTEGER
);
CREATE INDEX events_pending ON events(client_id, actor, notified_at);
