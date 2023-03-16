import axios from 'axios';
import { Write } from '../data'
import HygallRepositoryInterface from './HygallRepositoryInterface';

export default class HygallRepository implements HygallRepositoryInterface{

    async getAllMainList() : Promise<Number | Write.MainList[]>{
        return await axios.get("http://127.0.0.1:4000/get").then(response => {
            if(response.status === 200){
                return response.data;
            }else{
                return response.status;
            }
        });
    }
}