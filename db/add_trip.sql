INSERT INTO trips
(starting_city, starting_date, ending_city, ending_date, user_id)
VALUES
($1, $2, $3, $4, $5)
returning *;