import axios from 'axios';
import { Content, Write } from '../data'
import HygallRepositoryInterface from './HygallRepositoryInterface';

const tempApiUrl = 'http://127.0.0.1:4000';

export default class HygallRepository implements HygallRepositoryInterface{

    async getAllMainList() : Promise<Number | Write.MainList[]>{
        return await axios.get(`${tempApiUrl}/get`).then(response => {
            if(response.status === 200){
                return response.data;
            }else{
                return response.status;
            }
        });
    }

    addContent(newContent : Content.Content) : void { //async 필요없음
        console.log(JSON.stringify(newContent))

        axios.post(`${tempApiUrl}/postReqTest`,).then(response => {
            console.log(response)
        });
    }
}