const DEBUG = true;
const express = require('express');
const db = require('../db/db_connection.js');
const fs = require("fs");
const path = require("path");
const { requiresAuth } = require('express-openid-connect');

let categoriesRouter = express.Router();

const read_categories_all_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "read_categories_all.sql"), {encoding: "UTF-8"});

const read_used_categories_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "read_used_categories.sql"), {encoding: "UTF-8"});

categoriesRouter.get('/', requiresAuth(), (req, res) =>{
    db.execute(read_categories_all_sql, [req.oidc.user.email], (req1, res1) => {
        if (DEBUG)
            console.log(req1 ? req1 : res1);
        if (req1)
            res.status(500).send(req1); //Internal Server Error
        else {
            db.execute(read_used_categories_sql, [req.oidc.user.email], (req2, res2) => {
                console.log(res2);
                let data = {categories : res1, used: res2};
                res.render("categories", data);
            });
            
        }
    });
});

const insert_category_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "insert_category.sql"), {encoding: "UTF-8"});

categoriesRouter.post('/', requiresAuth(), (req, res) => {
    db.execute(insert_category_sql, [req.body.categoryName, req.oidc.user.email], (error, results) => {
        if (DEBUG)
            console.log(error ? error : error);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/categories`)            
        }
    });
});

const delete_category_sql = fs.readFileSync(path.join(__dirname, "..", "db", "queries", "crud", "delete_category.sql"), {encoding: "UTF-8"});

categoriesRouter.get('/:id/delete', requiresAuth(), (req, res) => {
    db.execute(delete_category_sql, [req.params.id, req.oidc.user.email], (error, results) => {
        if (DEBUG)
            console.log(error ? error : error);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/categories`)            
        }
    });
});

module.exports = categoriesRouter; 