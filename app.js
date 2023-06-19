const DEBUG = true;

const db = require('./db/db_connection');
const express = require( "express" );
const app = express();
const port = 8080;
const logger = require("morgan");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();
const path = require("path");
const fs = require("fs");


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

app.get('/profile', (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/', (req, res) => {
    res.render("index");
});

let applicationsRouter = require("./routes/applications.js");
app.use("/applications", requiresAuth(), applicationsRouter);

let categoriesRouter = require("./routes/categories.js");
app.use("/categories", requiresAuth(), categoriesRouter);

let todoRouter = require("./routes/todo.js");
app.use("/todo", requiresAuth(), todoRouter);

app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );



/*
Structure:
Myreports - homepage, lists all your reports, and resolved/unresolved status
report - specific report. Allows you to edit if it is yours.
allreports - All reports submitted. Allows to edit if yours, sends to managereport 
if of sufficient permissions
admin - manage permissions, default user defined in init.
*/
