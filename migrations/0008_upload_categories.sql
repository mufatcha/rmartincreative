-- "Photos, video & logo" becomes a fixed view on every client's page instead of
-- a starter section. Its uploads are sorted by category (logo, work, team,
-- video, misc); older general uploads (no item, no category) count as misc.

ALTER TABLE files ADD COLUMN category TEXT;

-- Retire the old starter sections, but only where nothing was uploaded to them.
UPDATE sections SET archived = 1
WHERE title = 'Photos, video & logo' AND archived = 0
  AND NOT EXISTS (
    SELECT 1 FROM items i JOIN files f ON f.item_id = i.id
    WHERE i.section_id = sections.id AND f.deleted = 0
  );

-- Open pages reload instead of keeping the old sections on screen.
UPDATE clients SET changed_at = changed_at + 1;
