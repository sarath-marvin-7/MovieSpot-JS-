import axios from 'axios';
import {API_KEY} from '../index';

export default class PopularPerson{
    constructor(){

    }
    async getResults(){
        try{
            const res = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`);
            this.result = res.data;
        }catch(err){
            alert(err.message);
        }
    }
}