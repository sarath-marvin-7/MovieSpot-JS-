import axios from 'axios';
// Get latest movie results
// https://api.themoviedb.org/3/trending/movie/day?api_key=b4962e2c82c6e6ef1959c8c0493d77e7 --> All Trending results

// Get videos using the results
// https://api.themoviedb.org/3/movie/567189/videos?api_key=b4962e2c82c6e6ef1959c8c0493d77e7&language=en-US 

export default class LatestTrailers{
    async getTrendingResults(){
        try{
        let results = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=b4962e2c82c6e6ef1959c8c0493d77e7`);
         this.result = results.data.results;         
        }
        catch(err){
            alert(err);
        }
    }
    async getTrailer(id){
        let trailerVideos = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b4962e2c82c6e6ef1959c8c0493d77e7&language=en-US `);
        return trailerVideos.data.results[0];
    }
}
