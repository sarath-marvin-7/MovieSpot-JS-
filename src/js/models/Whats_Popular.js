import axios from 'axios';
import {API_KEY} from '../index';

export default class whatsPopular{
    constructor(query,type){
        this.query = query;
        this.type = type;
    }
    async getResults(){
        try{
            const res = await axios.get(`https://api.themoviedb.org/3/${this.type}/${this.query}?api_key=${API_KEY}&language=en-US&page=1`);
            this.result = res.data.results;
        }
        catch(error){
            alert(error);
        }
    }
}