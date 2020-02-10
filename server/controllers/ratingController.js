module.exports = {
  getRatings: async (req, res, next) => {
    const { currentBrewery } = req.params;
    const db = req.app.get('db');
    const ratings = await db.get_ratings(currentBrewery);
    if (!ratings.length) {
      return res.status(404).send('No current ratings for this brewery');
    }
    res.status(200).send(ratings);
  },

  addRating: async (req, res, next) => {
    const db = req.app.get('db');
  }
}