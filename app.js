const express = require( "express" );
const logger = require("morgan");
const path = require("path");
const fs = require("fs");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db/db_connection');
const app = express();
const port = 3000;

app.set( "views",  path.join(__dirname , "views"));
app.set( "view engine", "ejs" );
app.use( express.urlencoded({ extended: false }) );
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, 'public') ));

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

app.use(auth(config));

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.oidc.isAuthenticated();
    res.locals.user = req.oidc.user;
    next();
})

app.get('/authtest', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

//Index sends straight to require router
let myreportsRouter = require("./routes/assignments.js");
app.use("/", requiresAuth(), assignmentsRouter);





// Immediately redirect Index to myreports


/*
Structure:
Myreports - homepage, lists all your reports, and resolved/unresolved status
report - specific report. Allows you to edit if it is yours.
allreports - All reports submitted. Allows to edit if yours, sends to managereport 
if of sufficient permissions
admin - manage permissions, default user defined in init.
*/