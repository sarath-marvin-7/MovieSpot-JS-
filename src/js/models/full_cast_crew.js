import {API_KEY} from '../index';
import axios from 'axios';

export default class Full_cast_crew{
    constructor(id,type){
        this.movieID = id;
        this.type = type;
    }
    async getFullCastCrew(){
        try{            
            let res;
            if(this.type === 'movie'){
                res = await axios.get(`https://api.themoviedb.org/3/${this.type}/${this.movieID}?api_key=${API_KEY}&language=en-US&append_to_response=images,casts,videos,recommendations&include_image_language=en,null`);
            } else if(this.type === 'tv'){
                res = await axios.get(`https://api.themoviedb.org/3/${this.type}/${this.movieID}?api_key=${API_KEY}&language=en-US&append_to_response=images,credits,videos,recommendations&include_image_language=en,null`);
            }
            this.result = res.data;
        }
        catch(err){
            alert(err.message);
        }
    }
}