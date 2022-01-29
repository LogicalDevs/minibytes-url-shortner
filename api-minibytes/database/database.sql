CREATE DATABASE minibytes;

CREATE TABLE links (
    id_link SERIAL PRIMARY KEY,
    org_link TEXT NOT NULL,
    min_link TEXT NOT NULL
);

INSERT INTO links (org_link, min_link)
VALUES ('a', 'b');

