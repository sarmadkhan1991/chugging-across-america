require('dotenv').config();
const express = require('express');
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}...`));