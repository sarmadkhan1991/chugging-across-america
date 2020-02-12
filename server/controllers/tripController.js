

module.exports = {
    getTrips: async (req, res, next) => {
        const { id } =  req.session.user;
        const db = req.app.get("db");
        const trips = await db.get_trips(id);
        res.status(200).send(trips)
    },

    addTrip: async (req, res, next) => {
        const { id } = req.session.user;
        console.log(req.session);
        const { cityOne, cityTwo } = req.body
        const db = req.app.get('db');
        await db.add_trip(cityOne, cityTwo, id, false);
        res.status(200).send("Added to trips");
    },

    addStop: async (req, res, next) => {
        const db = req.app.get('db');

    },

    deleteTrip: async (rea, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        await db.delete_trip(id);   
    },

    completedTrip: async (req,res,next) => {
        const { value, id } = req.body;
        const db = req.app.get("db");
        await db.complete_trip([value, id]);
        res.status(200).send('completed');
    }
}