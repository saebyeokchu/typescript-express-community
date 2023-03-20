interface Map {
    [key: string]: string 
}
  

const ErrorCode = {
    "Unkwoun" : "-1",
    "Success" : "0",
    "NoAddContent" : "100",
    "AddFail" : "101"
}

const AlertMessages : Map = {
    "0" : "성공적으로 처리되었습니다",

    //adding feature -> starts with 1
    "100" : "내용을 입력해주세요",
    "101" : "저장에 실패하였어요. 다시 시도해주세요"
}

export {
    ErrorCode,
    AlertMessages
}
