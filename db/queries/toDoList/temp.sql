SELECT
    applicationId, applicationName,
    categoryName, applications.categoryId as categoryId,
    priority,
    essaySubmitted, recRequest, transcriptRequest,
    DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateClean,
    DATE_FORMAT(dueDate, "%Y-%m-%d") AS dueDateForms,
    notes, status
FROM applications 
JOIN categories
    ON applications.categoryId = categories.categoryId
WHERE 
    applicationId = ? 
    AND applications.userId = ?
    AND status = 0
ORDER BY
    priority, dueDate