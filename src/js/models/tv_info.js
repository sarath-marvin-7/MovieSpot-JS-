import axios from 'axios';
import {API_KEY} from '../index';

export default class TV_Info{
    constructor(id,type){
        this.movieID = id;
        this.type = type;
    }
    async getResults(){
        try{
            const res =await axios.get(`https://api.themoviedb.org/3/${this.type}/${this.movieID}?api_key=${API_KEY}&language=en-US&append_to_response=images,credits,videos,recommendations&include_image_language=en,null`);
            this.result = res.data;
        }
        catch(err){
            alert(err.message);
        }
    }
    // async getCasts(){
    //     const res =await axios.get(`https://api.themoviedb.org/3/movie/${this.movieID}?api_key=${API_KEY}&language=en-US&append_to_response=images,casts,videos&include_image_language=en,null`);
    // }
}