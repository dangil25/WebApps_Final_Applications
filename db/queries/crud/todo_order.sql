SET @priorities = ?;
SET @dater = ?;
SELECT applicationName, DATE_FORMAT(dueDate, "%m/%d/%y (%W)") AS dueDateFormatted, categoryName, essaySubmitted, recRequest, transcriptRequest, notes
FROM applications
JOIN categories on categories.categoryId = applications.categoryId
WHERE (-1 = @priorities OR priority = @priorities) and ((0 = @dater and dueDate < CURRENT_TIMESTAMP) or (1 = @dater and dueDate > CURRENT_TIMESTAMP) or (2 = @dater)) and status = ? and applications.userId = ?
ORDER BY priority desc, dueDate;