const DEBUG = true;
const express = require('express');
const db = require('../db/db_connection.js');
const fs = require("fs");
const path = require("path");
const { requiresAuth } = require('express-openid-connect');

let todoRouter = express.Router();

const todo_order_sql = fs.readFileSync(path.join(__dirname, "..", 
"db", "queries", "crud", "todo_order.sql"),
{encoding : "UTF-8"});

todoRouter.get("/", (req, res) => {
    db.execute(todo_order_sql, [-1, 1, 0, req.oidc.user.email], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = {inventory: results, preferences: {priorityType: -1, dateType: 1, statusType: 0}};
            res.render('todo', data);
        }
    })
});

todoRouter.get("/:prior/:date/:status", (req, res) => {
    db.execute(todo_order_sql, [req.params.prior, req.params.date, req.params.status, req.oidc.user.email], (error, results) => {
        console.log(results);
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            let data = {inventory: results, preferences: {priorityType: req.params.prior, dateType: req.params.date, statusType: req.params.status}};
            res.render('todo', data);
        }
    })
});

todoRouter.post("/", (req, res) => {
    res.redirect(`/todo/${req.body.priority}/${req.body.date}/${req.body.status}`);
});

todoRouter.post("/:prior/:date/:status", (req, res) => {
    res.redirect(`/todo/${req.body.priority}/${req.body.date}/${req.body.status}`);
});
module.exports = todoRouter;