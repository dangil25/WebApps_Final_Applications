CREATE TABLE applications (
    applicationId INT NOT NULL AUTO_INCREMENT,
    applicationName VARCHAR(45) NOT NULL,
    categoryId INT NOT NULL,
    priorityId INT NOT NULL,
    essaySubmitted INT NULL,
    recRequest INT NULL,
    transcriptRequest INT NULL,
    dueDate DATE NULL,
    notes VARCHAR(150) NULL,
    status INT NULL,
    PRIMARY KEY (applicationId),

    INDEX applicationCategory_idx (categoryId ASC),
    CONSTRAINT applicationCategory
        FOREIGN KEY (categoryId)
        REFERENCES categories (categoryId)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
    ,
    INDEX applicationPriority_idx (priorityId ASC),
    CONSTRAINT applicationPriority
        FOREIGN KEY (priorityid)
        REFERENCES priorities (priorityId)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);