SELECT
    appplicationId, applicationName,
    categoryName, applications.categoryId as categoryId,
    priorityName, applications.priorityId as priorityId,
    essaySubmitted, recRequest, transcriptRequest,
    DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateClean,
    DATE_FORMAT(dueDate, "%Y-%m-%d") AS dueDateForms,
    notes, status
FROM applications 
JOIN categories
    ON applications.categoryId = categories.categoryId
JOIN priorities
    ON applications.priorityId = categories.priorityId
WHERE applicationId = ?