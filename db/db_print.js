const db = require("./db_connection");

//for queries
const path = require("path");
const fs = require("fs");


const select_categories_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "select_categories.sql"), {encoding: "UTF-8"});

db.execute(select_categories_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'categories' contents:")
        console.log(results);
    }
);


const select_priorities_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "select_priorities.sql"), {encoding: "UTF-8"});

db.execute(select_priorities_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'priorities' contents:")
        console.log(results);
    }
);


const select_applications_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "select_applications.sql"), {encoding: "UTF-8"});

db.execute(select_applications_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'applications' contents:")
        console.log(results);
    }
);

db.end();