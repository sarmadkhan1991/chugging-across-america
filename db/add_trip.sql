INSERT INTO trips
(starting_city, ending_city, user_id, completed)
VALUES
($1, $2, $3, $4)
returning *;