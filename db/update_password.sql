UPDATE users
SET hash = $1
WHERE user.id = $2