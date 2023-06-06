const DEBUG = true;
const express = require('express');
const db = require('../db/db_connection.js');
const fs = require("fs");
const path = require("path");

let applicationsRouter = express.Router();

const read_applications_all_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "read_applications_all.sql"), {encoding: "UTF-8"});

applicationsRouter.get("/", ( req, res ) => {
    db.execute(read_applications_all_sql, [req.oidc.user.sub], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.render('applications', results);
        }
    });    
});


const read_application_detail_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "read_application_detail.sql"), {encoding: "UTF-8"});

applicationsRouter.get("/:id", ( req, res ) => {
    db.execute(read_application_detail_sql, [req.oidc.user.sub], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No task found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            let data = {inventory: results[0]};
            res.render('detail', data);
        }
    });    
});

module.exports = applicationsRouter;