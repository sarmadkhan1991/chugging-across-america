SELECT r.id, r.rating, r.review, u.username FROM ratings r
JOIN users u
ON r.user_id = u.id
WHERE r.brewery_id = $1;