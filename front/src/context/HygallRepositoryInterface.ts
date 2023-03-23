import { Content, Write } from "../data"

export default interface HygallRepositoryInterface {
    // getAllMainList() : Promise<Write.MainList[]>
    getAllMainList() : Promise<boolean | Write.MainList[]>
    addContent(newContent : Content.Content) : Promise<boolean>
    uploadImage(formData : FormData) : Promise<boolean | object>
}