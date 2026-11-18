-- When the client last opened each view of their page ("files", "section-12"…),
-- for the green "new from Ryan" counts in the page's menu. "*" is the fallback
-- for views never opened: the client's first visit. Existing clients start from
-- their last visit, so nothing they've already seen counts as new.

ALTER TABLE clients ADD COLUMN views_seen TEXT NOT NULL DEFAULT '{}';
UPDATE clients SET views_seen = json_object('*', last_seen_at) WHERE last_seen_at IS NOT NULL;
