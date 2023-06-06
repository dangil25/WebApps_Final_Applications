SELECT * 
FROM applications
JOIN categories
    ON applications.categoryId = categories.categoryId
ORDER BY
    applications.applicationId;