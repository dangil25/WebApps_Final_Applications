const db = require("./db_connection");

//for queries
const path = require("path");
const fs = require("fs");


const delete_applications_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "delete_applications_table.sql"), {encoding: "UTF-8"});
db.execute(delete_applications_table_sql);

const delete_categories_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "delete_categories_table.sql"), {encoding: "UTF-8"});
db.execute(delete_categories_table_sql);

const delete_priorities_table_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "delete_priorities_table.sql"), {encoding: "UTF-8"});
db.execute(delete_priorities_table_sql);



const insert_category_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "insert_category.sql"), {encoding: "UTF-8"});

db.execute(insert_category_sql, [1, 'College']);
db.execute(insert_category_sql, [2, 'Internship']);
db.execute(insert_category_sql, [3, 'Summer Program']);
db.execute(insert_category_sql, [4, 'IVY LEAGUE']);

const insert_priority_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "insert_priority.sql"), {encoding: "UTF-8"});

db.execute(insert_priority_sql, [1, 'SUPER IMPORTANT']);
db.execute(insert_priority_sql, [2, 'High']);
db.execute(insert_priority_sql, [3, 'Medium']);
db.execute(insert_priority_sql, [4, 'Low']);


const insert_application_sql = fs.readFileSync(path.join(__dirname, "queries", "init", "insert_application.sql"), {encoding: "UTF-8"});


/* ORDER OF COLUMNS
applicationName VARCHAR(45) NOT NULL,
categoryId INT NOT NULL,
priorityId INT NOT NULL,
essaySubmitted INT NULL,
recRequest INT NULL,
transcriptRequest INT NULL,
dueDate DATE NULL,
notes VARCHAR(150) NULL,
status INT NULL,
*/


/*categoryId: 4 --> IVY LEAGUE
priorityId: 1 --> SUPER IMPORTANT
essaySubmitted: 2 --> Submitted
recRequest: 0 --> Not started
transcriptRequest: 1 --> Requested
dueDate: '2023-01-01'
status: 0 --> Unsubmitted
*/
db.execute(insert_application_sql, ['Harvard', 4, 1, 2, 0, 1, '2023-01-01', 'I need to get in plspls', 0]);



/*categoryId: 1 --> College
priorityId: 3 --> Medium
essaySubmitted: 2 --> Submitted
recRequest: 2 --> Submitted
transcriptRequest: 1 --> Requested
dueDate: '2023-03-31'
status: 1 --> Submitted
*/
db.execute(insert_application_sql, ['Emory', 1, 3, 2, 2, 1, '2023-03-31', 'slight reach, hopefully i make it', 1]);


/*categoryId: 2 --> Internship
priorityId: 4 --> Low
essaySubmitted: 1 --> In progress
recRequest: null
transcriptRequest: null
dueDate: '2023-08-15'
status: 0 --> Unsubmitted
*/
db.execute(insert_application_sql, ['Quantum Physics Internship', 2, 4, 1, null, null, '2023-08-15', 'prolly not getting in, not that important, but still try', 0]);


/*categoryId: 3 --> Summer Camp
priorityId: 2 --> High
essaySubmitted: null
recRequest: 1 --> requested
transcriptRequest: 2 --> submitted
dueDate: null
status: 1 --> Submitted
*/
db.execute(insert_application_sql, ['Web App Camp', 3, 2, null, 1, 2, null, 'no essay, just waiting on rec, rly good camp', 1]);

db.end();