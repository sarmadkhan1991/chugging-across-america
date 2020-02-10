INSERT INTO ratings
(brewery_id, rating, review, user_id)
VALUES
($1, $2, $3, $4);

SELECT r.id, r.rating, r.review, u.username FROM ratings r
JOIN users u
ON r.user_id = u.id
WHERE r.brewery_id = $1;