INSERT INTO ratings
(brewery_id, rating, review, user_id)
VALUES
($1, $2, $3, $4);
SELECT * FROM ratings WHERE brewery_id = $1;