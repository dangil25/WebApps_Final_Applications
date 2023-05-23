const db = require("./db_connection");

const delete_applications_table_sql = "DELETE from applications;"

db.execute(delete_applications_table_sql);

const delete_priority_table_sql = "DELETE from priority;"

db.execute(delete_priority_table_sql);

const delete_category_table_sql = "DELETE from category;"

db.execute(delete_category_table_sql);

const insert_category_sql = `
    INSERT INTO category
        (id, categoryName, userid)
    VALUES
        (?, ?, ?);
`
db.execute(insert_category_sql, [0, "Ivy League", "dangil25@bergen.org"]);
db.execute(insert_category_sql, [1, "Colleges", "dangil25@bergen.org"]);
db.execute(insert_category_sql, [2, "Summer Programs", "dangil25@bergen.org"]);
db.execute(insert_category_sql, [3, "Internships", "dangil25@bergen.org"]);

const insert_priority_sql = `
    INSERT INTO priority
        (id, priorityName)
    VALUES
        (?, ?, ?);
`

db.execute(insert_priority_sql, [0, "Low"])
db.execute(insert_priority_sql, [1, "Medium"])
db.execute(insert_priority_sql, [2, "High"])

const insert_applications_sql = `
    INSERT INTO applications
        (id, applicationName, categoryid, priorityid, 
            essayStatus, recReqested, transcriptRequested, 
            dueDate, notes, status)
    VALUS
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`
db.execute(insert_applications_sql, [])