-- Cheap polling: every change to a client's page bumps changed_at, so a poll
-- that finds it unchanged costs one indexed row read instead of reloading the
-- whole page (D1's free plan counts rows read and written per day).
ALTER TABLE clients ADD COLUMN changed_at INTEGER NOT NULL DEFAULT 0;

-- The admin activity feed (newest first) without scanning every event.
CREATE INDEX events_recent ON events(client_id, created_at);
