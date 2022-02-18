import axios from 'axios';
import {API_KEY} from '../index';

export default class SearchResults{
    constructor(type,query){
        this.type = type;
        this.query = query;
    }
    async getResults(){
        try{
            const res = await axios.get(`https://api.themoviedb.org/3/search/${this.type}?api_key=${API_KEY}&query=${this.query}&language=en-US&page=1&include_adult=false`);
            this.result = res.data;
        }catch(err){
            alert(err.message);
        }
    }

}