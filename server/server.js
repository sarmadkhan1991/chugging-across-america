require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const tripCtrl = require('./controllers/tripController');
const authCtrl = require('./controllers/authController');
const ratingCtrl = require('./controllers/ratingController');
const auth = require('./middleware/authMiddleware');
const axios = require('axios');

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
});

app.use(express.json());
app.use(
    session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET,
    })
  );

app.use( express.static( `${__dirname}/../build` ) );

app.get('/api/auth/userSession', authCtrl.getUserSession);
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.post('/api/auth/logout', authCtrl.logout);
app.put('/api/auth/updatePassword', auth.usersOnly, authCtrl.updatePassword);
app.put('/api/auth/verifyPassword', auth.usersOnly, authCtrl.verifyPassword);

app.get('/user/trips', auth.usersOnly, tripCtrl.getTrips);
app.put('/user/trips', auth.usersOnly, tripCtrl.completedTrip)
app.post('/user/trip', auth.usersOnly, tripCtrl.addTrip);
app.delete('/user/trip/:id', tripCtrl.deleteTrip);

app.get('/api/rating/:id', ratingCtrl.getRatings);
app.post('/api/rating/:id', ratingCtrl.addRating);

app.post('/api/directions', async (req, res, next) => {
  const {cities} = req.body;
  const directions = await axios.post(`https://maps.googleapis.com/maps/api/directions/json?origin=${cities[0].name}&destination=${cities[1].name}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`).catch(e => console.log(e));
  res.status(200).send(directions.data.routes[0].legs[0]);
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));