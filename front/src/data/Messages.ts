interface Map {
    [key: string]: string 
}
  

const ErrorCode = {
    "Unkwoun" : "-1",
    "Success" : "0",
    "NoAddContent" : "100",
    "AddFail" : "101",
    "ShortLockCode" : "102",
    "ImageUploadFail" : "200",
    "DeleteFail" : "300"
}

const AlertMessages : Map = {
    "-1" : "알 수 없는 오류가 발생되었습니다",
    "0" : "성공적으로 처리되었습니다",

    //adding feature -> starts with 1
    "100" : "내용을 입력해주세요",
    "101" : "저장에 실패하였어요. 다시 시도해주세요",
    "102" : "비밀번호는 4글자 이상이여야 해요",

    //image
    "200" : "이미지 저장에 실패했어요! 잠시후 시도해주세요",

    //delete feature
    "300" : "포스트 삭제에 실패하였습니다. 잠시 후 시도하여 주세요"
}

export {
    ErrorCode,
    AlertMessages
}
