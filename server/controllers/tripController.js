

module.exports = {
    getTrips: async (req, res, next) => {
        const { user_id } =  req.session
        const db = req.app.get("db");
        const trips = await db.get_trips(user_id);
        res.status(200).send(trips)
    },

    saveTrip: async (req, res, next) => {
        
    },

    deleteTrip: async (rea, res, next) => {
        const { id } = req.params;
        const db = req.app.get("db");
        await db.delete_trip(id);
        
        
        
    }
}