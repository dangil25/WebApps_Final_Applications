
SELECT
    applicationName,
    DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateFormatted,
    categoryName,
    essaySubmitted, recRequest, transcriptRequest,
    notes,
    @priorities = ?,
    @dater = ?
FROM applications 
JOIN categories
    ON applications.categoryId = categories.categoryId
WHERE 
    @priorities in (-1, priority)
    AND ((0 = @dater and dueDate < CURRENT_TIMESTAMP) or (1 = @dater and dueDate > CURRENT_TIMESTAMP) or (2 = @dater))
    AND status = ?
    AND applications.userId = ?
ORDER BY
    priority desc, dueDate
    