SELECT * 
FROM applications
JOIN categories
    ON applications.categoryId = categories.categoryId 
JOIN priorities
    ON applications.priorityId = priorities.priorityId 
ORDER BY
    applications.applicationId;