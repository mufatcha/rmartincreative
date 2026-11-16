-- The client's website addresses, kept on the admin page: where the test
-- (staging) build lives and the permanent (live) address.

ALTER TABLE clients ADD COLUMN test_url TEXT NOT NULL DEFAULT '';
ALTER TABLE clients ADD COLUMN live_url TEXT NOT NULL DEFAULT '';
