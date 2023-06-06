SELECT
    applicationId, applicationName,
    categoryName, applications.categoryId as categoryId,
    priority,
    DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateFormatted, 
    status
FROM applications 
JOIN categories
    ON applications.categoryId = categories.categoryId
ORDER BY applications.applicationId DESC;