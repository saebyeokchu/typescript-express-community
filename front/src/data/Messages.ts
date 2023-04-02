interface Map {
    [key: string]: string 
}
  

const ErrorCode = {
    "Unkwoun" : "-1",
    "Success" : "0",
    "LoadFail" : "1",
    "NoAddContent" : "100",
    "AddFail" : "101",
    "ShortLockCode" : "102",
    "ImageUploadFail" : "200",
    "DeleteFail" : "300",
    "UnmatchedUnlockCode" : "400",
    "NoContent" : "500",
    "NoComment" : "600"
}

const AlertMessages : Map = {
    "-1" : "알 수 없는 오류가 발생되었습니다",
    "0" : "성공적으로 처리되었습니다",
    "1" : "해당하는 글을 찾을 수 없습니다",

    //adding feature -> starts with 1
    "100" : "내용을 입력해주세요",
    "101" : "저장에 실패하였어요. 다시 시도해주세요",
    "102" : "비밀번호는 4글자 이상이여야 해요",

    //image
    "200" : "이미지 저장에 실패했어요! 잠시후 시도해주세요",

    //delete feature
    "300" : "포스트 삭제에 실패하였습니다. 잠시 후 시도하여 주세요",

    //edit feature
    "400" : "수정 / 삭제용 비밀번호가 일치하지 않습니다",

    //list
    "500" : "등록된 글이 존재하지 않습니다",

    //comment
    "600" : "등록된 댓글이 없습니다"
}

export {
    ErrorCode,
    AlertMessages
}
