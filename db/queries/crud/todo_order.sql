SELECT applicationName, DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateFormatted, categoryName, essaySubmitted, recRequest, transcriptRequest, notes
FROM applications
JOIN categories on categories.categoryId = applications.categoryId
WHERE (priority = ? OR priority = -1) and (((0 = ? and dueDate < CURRENT_TIMESTAMP) or dueDate > CURRENT_TIMESTAMP)) and status = ? and applications.userId = ?
ORDER BY priority desc, dueDate