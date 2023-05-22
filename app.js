
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
const port = 8080;

app.set( "views",  path.join(__dirname , "views"));
app.set( "view engine", "ejs" );
app.use( express.urlencoded({ extended: false }) );
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, 'public') ));

const config = {
    authRequired: true,
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

app.get('/profile', (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/', (req, res) =>{
    console.log("GET /");
    res.redirect("/myapplications");
});

app.get('/myapplications', (req, res) =>{
    console.log("GET /myapplications");
    res.render("myapplications");
});

app.get('/application', (req, res) =>{
    console.log("GET /application");
    res.render("application");
});

app.get('/categories', (req, res) =>{
    console.log("GET /categories");
    res.render("managecategories");
});



app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

// Immediately redirect Index to myreports


/*
Structure:
Myreports - homepage, lists all your reports, and resolved/unresolved status
report - specific report. Allows you to edit if it is yours.
allreports - All reports submitted. Allows to edit if yours, sends to managereport 
if of sufficient permissions
admin - manage permissions, default user defined in init.
*/