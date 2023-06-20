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
    db.execute(todo_order_sql, [-1, -1, 1, 1, 1, 0, req.oidc.user.email], (error, results) => {
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
// We know passing same value is stupid, we tried to figure out variables, and code worked in workbench but not in sql files on here:
/*
SET @priorities = -1;
SET @dater = 2;

SELECT applicationName, DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateFormatted, categoryName, essaySubmitted, recRequest, transcriptRequest, notes
FROM applications
JOIN categories on categories.categoryId = applications.categoryId
WHERE (-1 = @priorities OR priority = @priorities) and ((0 = @dater and dueDate < CURRENT_TIMESTAMP) or (1 = @dater and dueDate > CURRENT_TIMESTAMP) or (2 = @dater)) and status = 0 and applications.userId = "dangil25@bergen.org"
ORDER BY priority desc, dueDate;
*/
todoRouter.get("/:prior/:date/:status", (req, res) => {
    db.execute(todo_order_sql, [req.params.prior, req.params.prior, req.params.date, req.params.date, req.params.date, req.params.status, req.oidc.user.email], (error, results) => {
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