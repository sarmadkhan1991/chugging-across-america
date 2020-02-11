INSERT INTO trips
(starting_city, ending_city, user_id)
VALUES
($1, $2, $3)
returning *;