# Chugging Across America
## Features
- Users can:
  - Locate breweries in target destinations
  - Register an account and save road trips
  - Keep track of which breweries they've been to/beers had
  - Can edit routes based on POIs
  - Post/view brewery/beer suggestions
- Admins can:
  - Remove posts
  - Remove/suspend users
  - Rules/social responsibility
## Front-end
### Checklist
- reset.css ==> eric meyers 2.0 reset
- package.json
  - "main": "server/server.js"
  - "proxy": "http://localhost:4000"
### File Structure
- src/
  - App.js => class
  - index.js
  - App.css
  - index.css => reset.css
  - setupProxy.js
  - Components/
    - Auth.js
    - Header.js
    - Dashboard.js
    - Profile.js
    - Trip.js
    - Weather.js
    - Breweries.js
    - Reviews.js
    - Homepage.js
  - Routes
### Dependencies
- axios ==> make API calls
- redux-promise-middleware
- react-router-dom ==> navigate components
- react-icons
- react-loader-spinner
## Back-end
### Checklist
### File Structure
- server/
  - server.js
  - controllers/
    - authController.js
    - mapsController.js
    - beerController.js
    - weatherController.js
  - middleware
    - authMiddleware.js
### Dependencies
- express
- express-session
- massive
- bcryptjs
- dotenv
### API Routes
Auth:
- Login: POST `/auth/login`
- Register: POST `/auth/register`
- Logout: DELETE `/auth/logout`

Breweries
- Get All Breweries: Get `v2/breweries/key&query`

Weather
- Get weather: GET `TBD`

Profile
- Get saved trips: GET `/user/trips`
- Save trip: POST `/user/trip`
- Remove trip: DELETE `/user/trip/:id`
- Get info: GET `/user`
- Update info: PUT `/user/update`
### Data
```js
const service = {
    id: Number,
    name: String,
    description: String
}
```

## Database