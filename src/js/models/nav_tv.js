import axios from 'axios';
import {API_KEY} from '../index';

export default class TVInfo{
    constructor(id){
        this.id = id;
    }
    
    async getResults(){
        try{
            const res = await axios.get(`https://api.themoviedb.org/3/tv/${this.id}?api_key=${API_KEY}&language=en-US&page=1`);
            this.result = res.data;
        }catch(err){
            alert(err.message);
        }
    }
}