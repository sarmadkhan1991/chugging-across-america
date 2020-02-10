module.exports = {
  getRatings: async (req, res, next) => {
    const { id } = req.params;
    const db = req.app.get('db');
    const ratings = await db.get_ratings(id);
    if (!ratings.length) {
      return res.status(404).send('No current ratings for this brewery');
    }
    res.status(200).send(ratings);
  },

  addRating: async (req, res, next) => {
    const db = req.app.get('db');
    const { id } = req.params;
    const { rating, review, user_id } = req.body;
    if (user_id === undefined) {
      res.status(401).send('Unauthorized.');
    } else if (rating === undefined || review === undefined) {
      res.status(406).send('Please fill in all fields.');
    } else {
      const ratings = await db.add_rating([id, rating, review, user_id]);
      res.status(200).send(ratings);
    }
  }
}