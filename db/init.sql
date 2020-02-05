CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) NOT NULL,
  hash text
);

-- Register user
INSERT INTO users
(username, hash)
VALUES
($1, $2)
returning *;

CREATE TABLE trips
(
    id SERIAL PRIMARY KEY,
    starting_city VARCHAR(40) NOT NULL,
    starting_date DATE NOT NULL,
    ending_city VARCHAR(40) NOT NULL,
    ending_date DATE NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

INSERT INTO trips
(starting_city, starting_date, ending_city, ending_date, user_id) 
VALUES
(
'Phoenix',
'2020-02-14',
'San Diego',
'2020-03-01',
1
);