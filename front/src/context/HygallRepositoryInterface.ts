import { Write } from "../data"

export default interface HygallRepositoryInterface {
    // getAllMainList() : Promise<Write.MainList[]>
    getAllMainList() : Write.MainList[]
}