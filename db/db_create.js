const db = require("./db_connection");

const drop_applications_table_sql = "DROP TABLE IF EXISTS applications;"

db.execute(drop_applications_table_sql);

const drop_category_table_sql = "DROP TABLE IF EXISTS category;"

db.execute(drop_category_table_sql);

const drop_priority_table_sql = "DROP TABLE IF EXISTS priority;"

db.execute(drop_priority_table_sql);

const create_category_table_sql = `
    CREATE TABLE category (
        id INT NOT NULL AUTO_INCREMENT,
        categoryName VARCHAR(45) NOT NULL,
        userId VARCHAR(255) NULL,
        PRIMARY KEY (id));
`
db.execute(create_category_table_sql);

const create_priority_table_sql = `
    CREATE TABLE priority (
        id INT NOT NULL AUTO_INCREMENT,
        priorityName VARCHAR(45) NOT NULL,
        PRIMARY KEY (id)
    );
    
`
db.execute(create_priority_table_sql);

const create_applications_table_sql = `
    CREATE TABLE applications (
        id INT NOT NULL AUTO_INCREMENT,
        applicationName VARCHAR(45) NOT NULL,
        categoryid INT NOT NULL,
        priorityid INT NOT NULL,
        essaySubmitted INT NULL,
        recRequest INT NULL,
        transcriptRequest INT NULL,
        dueDate DATE NULL,
        notes VARCHAR(150) NULL,
        status INT NULL,
        
        userId VARCHAR(255) NULL,
        PRIMARY KEY (id),
        CONSTRAINT main
            FOREIGN KEY (categoryid)
            REFERENCES category (id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE,
        
        CONSTRAINT two
            FOREIGN KEY (priorityid)
            REFERENCES priority (id)
            ON DELETE RESTRICT
            ON UPDATE CASCADE
    );
`

db.execute(create_applications_table_sql);

db.end();
