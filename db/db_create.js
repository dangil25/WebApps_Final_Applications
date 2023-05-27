const db = require("./db_connection");

//for queries
const path = require("path");
const fs = require("fs");

const drop_applications_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "drop_applications_table.sql"), {encoding: "UTF-8"});
db.execute(drop_applications_table_sql);

const drop_categories_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "drop_categories_table.sql"), {encoding: "UTF-8"});
db.execute(drop_categories_table_sql);

const drop_priorities_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "drop_priorities_table.sql"), {encoding: "UTF-8"});
db.execute(drop_priorities_table_sql);

const create_categories_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "create_categories_table.sql"), {encoding: "UTF-8"});
db.execute(create_categories_table_sql);

const create_priorities_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "create_priorities_table.sql"), {encoding: "UTF-8"});
db.execute(create_priorities_table_sql);

const create_applications_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "create_applications_table.sql"), {encoding: "UTF-8"});
db.execute(create_applications_table_sql);

db.end();
