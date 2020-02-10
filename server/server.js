require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const tripCtrl = require('./controllers/tripController');
const authCtrl = require('./controllers/authController');
const ratingCtrl = require('./controllers/ratingController');
const auth = require('./middleware/authMiddleware');

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

app.get('/api/auth/userSession', authCtrl.getUserSession);
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.post('/api/auth/logout', authCtrl.logout);
app.put('/api/auth/updatePassword', auth.usersOnly, authCtrl.updatePassword);

app.get('/user/trips', auth.usersOnly, tripCtrl.getTrips);
app.post('/user/trip', auth.usersOnly, tripCtrl.addTrip);
app.delete('/user/trip/:id', tripCtrl.deleteTrip);

app.get('/api/rating/:id', ratingCtrl.getRatings);
app.post('/api/rating/:id', ratingCtrl.addRating);

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));