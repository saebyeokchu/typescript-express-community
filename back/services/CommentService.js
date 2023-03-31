function updateComment() {
    return db.contents.updateOne({contentId : 1},{$push : {comments : {id : 1, comment : "환영합니다", createdAt : "2023-03-31 18:23:59"}}})
}