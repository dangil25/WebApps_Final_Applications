
SELECT applicationName, DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateFormatted, categoryName, essaySubmitted, recRequest, transcriptRequest, notes, status, priority
FROM applications
JOIN categories on categories.categoryId = applications.categoryId
WHERE (-1 = ? OR priority = ?) and ((0 = ? and dueDate < CURRENT_TIMESTAMP) or (1 = ? and dueDate > CURRENT_TIMESTAMP) or (2 = ?)) and status = ? and applications.userId = ?
ORDER BY priority desc, dueDate