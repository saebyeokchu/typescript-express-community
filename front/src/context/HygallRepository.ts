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

    async addContent(newContent : Content.Content) : Promise<boolean> { //async 필요없음
        return await axios.post(`${tempApiUrl}/add`,newContent).then(response => {
            return response.status === 200
        });
    }
}