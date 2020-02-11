

module.exports = {
    getTrips: async (req, res, next) => {
        const { id } =  req.session.user;
        console.log(req.session)
        const db = req.app.get("db");
        const trips = await db.get_trips(id);
        res.status(200).send(trips)
    },

    addTrip: async (req, res, next) => {
        const { id } = req.session.user;
        console.log(req.session);
        const { cityOne, cityTwo } = req.body
        const db = req.app.get('db');
        await db.add_trip(cityOne, cityTwo, id);
        res.status(200).send("Added to trips");

    },

    deleteTrip: async (rea, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        await db.delete_trip(id);
        
    }
}