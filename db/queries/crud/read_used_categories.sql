SELECT c.categoryId
    from categories as c
    join applications as a on a.categoryId = c.categoryId
    where a.userId = ?