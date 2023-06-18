UPDATE applications
SET
    applicationName = ?,
    categoryId = ?,
    priority = ?,
    essaySubmitted = ?,
    recRequest = ?,
    transcriptRequest = ?,
    dueDate = ?,
    notes = ?,
    status = ?
WHERE applicationId = ?
AND userId = ?

