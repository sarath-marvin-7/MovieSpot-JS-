import axios from 'axios';
import {API_KEY} from '../index';

export default class PeopleInfo{
    constructor(id){
        this.id = id;
    }
    async getResults(){
        try{
            const res = await axios.get(`https://api.themoviedb.org/3/person/${this.id}?api_key=${API_KEY}&language=en-US`);
            this.result = res.data;
        }catch(err){
            alert(err.message);
        }
    }

    async getExternalID(){
        try{
            const res = await axios.get(`https://api.themoviedb.org/3/person/${this.id}/external_ids?api_key=${API_KEY}&language=en-US`);
            this.external_id = res.data;
        } catch(err){
            alert(err.message);
        }
    }
}
