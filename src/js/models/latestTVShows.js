import axios from 'axios';
import {API_KEY} from '../index';

export default class TVShows{
    constructor(time_window,type){
        this.time_window = time_window;
        this.type = type;
    }
    async getTVShows(){
        try{
            const tvshows = await axios.get(`https://api.themoviedb.org/3/trending/${this.type}/${this.time_window}?api_key=${API_KEY}`);
            this.result = tvshows.data.results;
        }
        catch(error){
            alert(error);
        }       
    }
}