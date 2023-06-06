SELECT
    appplicationId, applicationName,
    categoryName, applications.categoryId as categoryId,
    priorityName, applications.priorityId as priorityId,
    DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateFormatted, 
    status
FROM applications 
JOIN categories
    ON applications.categoryId = categories.categoryId
JOIN priorities
    ON applications.priorityId = categories.priorityId
ORDER BY applications.applicationId DESC;