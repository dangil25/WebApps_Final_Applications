const DEBUG = true;
const express = require('express');
const db = require('../db/db_connection.js');
const fs = require("fs");
const path = require("path");
const { create } = require('domain');

let applicationsRouter = express.Router();

const read_applications_all_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "read_applications_all.sql"), {encoding: "UTF-8"});

applicationsRouter.get("/", ( req, res ) => {
    db.execute(read_applications_all_sql, [req.oidc.user.email], (error, results) => {
        console.log(results[0])
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = {results: results[0]};
            
            res.render('applications', data);
        }
    });    
});


const read_application_detail_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "read_application_detail.sql"), {encoding: "UTF-8"});
const read_categories_all_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "read_categories_all.sql"), {encoding: "UTF-8"});

applicationsRouter.get("/:id", ( req, res ) => {
    db.execute(read_application_detail_sql, [req.params.id, req.oidc.user.email], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No task found with id = "${req.params.id}"` ); // NOT FOUND
        else {
            db.execute(read_categories_all_sql, [req.oidc.user.email], (req, cat) => {
                let data = {inventory: results[0], categories: cat};
                res.render('detail', data);
            });
        }
    });    
});

const create_assignment_sql = fs.readFileSync(path.join(__dirname, "..", 
    "db", "queries", "crud", "insert_application.sql"),
    {encoding : "UTF-8"});
    
applicationsRouter.post("/", (req, res) => {
    db.execute(create_assignment_sql, [req.body.applicationName, req.body.categoryId, req.body.priority, 0, 0, 0,
    req.body.dueDate, req.body.notes, req.oidc.user.email, 0], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (assignmentId) of the newly inserted row.
            res.redirect(`/applications/${results.insertId}`);
        }
    });
});

const update_application_sql = fs.readFileSync(path.join(__dirname, "..", 
"db", "queries", "crud", "update_application.sql"),
{encoding : "UTF-8"});

applicationsRouter.post("/:id", (req, res) => {
    db.execute(update_application_sql, [req.body.title, req.body.category, req.body.priority, req.body.essay, 
    req.body.recommendations, req.body.transcript, req.body.dueDate, req.body.notes, req.body.status, req.params.id, req.oidc.user.email], (error, results)=> {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/applications/${req.params.id}`);
        }
    })
}); 

const delete_application_sql = fs.readFileSync(path.join(__dirname, "..", 
"db", "queries", "crud", "delete_application.sql"),
{encoding : "UTF-8"});

applicationsRouter.get("/delete/:id", (req, res) => {
    db.execute(delete_application_sql, [req.params.id, req.oidc.user.email], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/applications`);
        }
    })
});

// const insert_application_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "insert_application.sql"), {encoding: "UTF-8"});
// applicationsRouter.post(insert_application_sql, [req.body.applicationName, req.body.category, req.body.priority, 0, 0, 0, 
//     req.body.dueDate, req.body.notes, req.oidc.user.email, 0], (req, res) => {

// });


module.exports = applicationsRouter;