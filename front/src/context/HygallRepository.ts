import { Write } from '../data'
import HygallRepositoryInterface from './HygallRepositoryInterface';

export default class HygallRepository implements HygallRepositoryInterface{

    getAllMainList() : Write.MainList[]{
        //모델 작업 나중에
        const tempList : Write.MainList[] = [];

        for(let i=0;i<50;i++){
            tempList.push(Write.Template) 
        }

        return tempList
    }
}