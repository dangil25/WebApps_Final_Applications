const db = require("./db_connection");

const drop_reports_table_sql = "DROP TABLE IF EXISTS reportds;"

db.execute(drop_reports_table_sql);

const drop_services_table_sql = "DROP TABLE IF EXISTS services;"

db.execute(drop_services_table_sql);


const create_types_table_sql = `
    CREATE TABLE services (
        typeId INT NOT NULL AUTO_INCREMENT,
        typeName VARCHAR(45) NOT NULL,
        userId VARCHAR(255) NULL,
        PRIMARY KEY (typeId));
`
db.execute(create_services_table_sql);

const create_reports_table_sql = `
    CREATE TABLE reports (
        reportId INT NOT NULL AUTO_INCREMENT,
        reportName VARCHAR(45) NOT NULL,
        priority INT NULL,
        handlerId INT NOT NULL,
        createDate DATE NULL,
        description VARCHAR(150) NULL,
        userId VARCHAR(255) NULL,
        PRIMARY KEY (assignmentId),
        INDEX assignmentSubject_idx (subjectId ASC),
        CONSTRAINT assignmentSubject
            FOREIGN KEY (subjectId)
            REFERENCES subjects (subjectId)
            ON DELETE RESTRICT
            ON UPDATE CASCADE);
`

db.execute(create_reports_table_sql);

db.end();
