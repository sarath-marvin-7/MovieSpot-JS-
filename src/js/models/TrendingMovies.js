import axios from 'axios';
import {API_KEY} from '../index';
export default class Trending{
    constructor(time_window,type){
        this.time_window = time_window;
        this.type = type;
    }
    async getTrendingMovies(){
        try{
            const trending = await axios.get(`https://api.themoviedb.org/3/trending/${this.type}/${this.time_window}?api_key=${API_KEY}`);
            this.result = trending.data.results;
        }
        catch(error){
            alert(error);
        }       
    }
}