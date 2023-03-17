import { Content, Write } from "../data"

export default interface HygallRepositoryInterface {
    // getAllMainList() : Promise<Write.MainList[]>
    getAllMainList() : Promise<Number | Write.MainList[]>
    addContent(newContent : Content.Content) : void
}