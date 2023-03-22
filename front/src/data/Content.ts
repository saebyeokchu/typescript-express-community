import moment from "moment"

const Template : Content = {
    contentId : 0,
    title : 'A path from a point approximately 330 metres east of the most south',
    content : 'Here are 65 examples of long sentences ranging from the relatively brief 96 words to one of the longest sentences at 2,156 words.\nAlmost all of the really long sentences are under 1,000 words. The six longest sentences (1,000+ words) are mostly a curiosity, just to see what is possible.\nI hope students of writing can study these sentences to find inspiration. My advice on how to learn from them? Try these three practices:',
    readCount :20,
    viewCount : 200,
    createdAt : '2023-03-04 11:23:58',
    comments : [
        {
            id : 1,
            content : '재밌어요',
            createdAt : '2023-03-04 11:23:58'
        },
        {
            id : 2,
            content : '선생님 다음편 주세요...',
            createdAt : '2023-03-04 11:23:58'
        },
        {
            id : 3,
            content : 'ㄱㅊ',
            createdAt : '2023-03-04 11:23:58'
        }
    ]   
}

class Comment{
    id : number = -1
    content : string = ""
    createdAt : string = ""
}

class Content{
    contentId : number = -1
    title : string = ""
    content : string = ""
    commentCount : number = 0
    viewCount : number = 0
    createdAt : string = ""
    comments : Comment[] = []

    public constructor(contentLength : number, init? : Partial<Content>){
        Object.assign(this, init)

        //날짜 설정하기
        console.log(contentLength)
        this.contentId = contentLength + 1 //나중에 자동 increase 시키면 좋겠다
        this.createdAt = moment().format("YYYY-MM-DD hh:mm:ss")
    }
}

export {
    Template,
    Content,
    Comment
}