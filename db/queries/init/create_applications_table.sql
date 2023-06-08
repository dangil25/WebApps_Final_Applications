CREATE TABLE applications (
    applicationId INT NOT NULL AUTO_INCREMENT,
    applicationName VARCHAR(45) NOT NULL,
    categoryId INT NOT NULL,
    priority INT NOT NULL,
    essaySubmitted INT NULL,
    recRequest INT NULL,
    transcriptRequest INT NULL,
    dueDate DATE NULL,
    notes VARCHAR(150) NULL,
    userId VARCHAR(45) NOT NULL,
    status INT NULL,
    PRIMARY KEY (applicationId),

    INDEX applicationCategory_idx (categoryId ASC),
    CONSTRAINT applicationCategory
        FOREIGN KEY (categoryId)
        REFERENCES categories (categoryId)
        ON DELETE RESTRICT
        ON UPDATE CASCADE);