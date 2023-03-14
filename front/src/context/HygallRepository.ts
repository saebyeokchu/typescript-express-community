import axios from 'axios';
import { Write } from '../data'
import HygallRepositoryInterface from './HygallRepositoryInterface';

export default class HygallRepository implements HygallRepositoryInterface{

    getAllMainList() : Write.MainList[]{
        //db가져오기
        axios.get("http://127.0.0.1:4000/getData").then(result => {
            console.log(result);
        });
        
        //모델 작업 나중에
        const tempList : Write.MainList[] = [];

        for(let i=0;i<50;i++){
            tempList.push(Write.Template) 
        }

        return tempList
    }
}