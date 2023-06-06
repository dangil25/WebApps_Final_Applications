const DEBUG = true;
const express = require('express');
const db = require('../db/db_connection.js');
const fs = require("fs");
const path = require("path");

let categoriesRouter = express.Router();


categoriesRouter.get('/categories', (req, res) =>{
    console.log("GET /categories");
    res.render("managecategories");
});


module.exports = categoriesRouter; 