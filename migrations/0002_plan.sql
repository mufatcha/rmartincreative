-- The project plan on each onboarding page: what Ryan is doing now, what's next,
-- the features the client can expect, and what's finished.
-- stage: now | next | feature | done

CREATE TABLE plan_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL REFERENCES clients(id),
  stage TEXT NOT NULL,
  title TEXT NOT NULL,
  detail TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,         -- wording or stage last changed
  removed_at INTEGER                   -- taken off the plan (shown as "Removed" once)
);
CREATE INDEX plan_items_client ON plan_items(client_id);

-- When the client last opened the plan. Items added, changed, or removed after
-- this get a New / Updated / Removed label the next time they open it.
ALTER TABLE clients ADD COLUMN plan_seen_at INTEGER;
