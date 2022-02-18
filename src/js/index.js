//Global App controller
import whatsPopular from './models/Whats_Popular';
import Trending from './models/TrendingMovies';
import LatestTrailers from './models/latestTrailers';
import TVShows from './models/latestTVShows';
import TV_Info from './models/tv_info';
import Full_cast_crew from './models/full_cast_crew';
import PeopleInfo from './models/people_info';
import NavMovies from './models/nav_movies';
import TVInfo from './models/nav_tv';
import PopularPerson from './models/popular_person';
import { elements } from './views/base';
import * as popularView from "./views/Whats_Popular_view";
import * as trendingView from "./views/TrendingMovies_view";
import * as trailerView from "./views/latestTrailers_view";
import * as tvShowsView from "./views/latestTVShows_view";
import * as fullCastCrew from "./views/full_cast_crew_view";
import * as tvInfo from "./views/tv_info_view";
import * as peopleInfo from "./views/people_info_view";
import * as navMovies from "./views/nav_movies_view";
import * as navTV from './views/nav_tv_view';
import * as popularPerson from './views/popular_person_view';
import SearchResults from './models/search';
import * as searchView from './views/search_view';
// second page
import Movie_Info from './models/movieInfo';
import * as movieInfo from "./views/movieInfo_view";
import swal from 'sweetalert';

export const API_KEY = 'b4962e2c82c6e6ef1959c8c0493d77e7';

const state = {};

const controlPopular = async (query = 'popular', type = 'movie') => {
    // 1. create a new instance using the query
    state.popular = new whatsPopular(query, type);

    // 2. get results using the instance
    await state.popular.getResults();

    // 3. prepare UI for results
    popularView.clearResults();

    // 4. render results to the UI
    popularView.renderPopular(state.popular.result,type);
}
controlPopular();

// whats Popular Event listeners
const popular_link = document.querySelector('.popular-link');
if(popular_link){
    popular_link.addEventListener('click', event => {
        controlPopular('popular');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

const upcoming_link = document.querySelector('.upcoming-link');
if(upcoming_link){
    upcoming_link.addEventListener('click', event => {
        controlPopular('upcoming');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

const toprated_link = document.querySelector('.toprated-link');
if(toprated_link){
    toprated_link.addEventListener('click', event => {
        controlPopular('top_rated');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

const intheatre_link = document.querySelector('.intheatres-link');
if(intheatre_link){
    intheatre_link.addEventListener('click', event => {
        controlPopular('now_playing');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

const form_submit = document.querySelector('.form-submit');
if(form_submit){
    form_submit.addEventListener('submit', e => {
    e.preventDefault();
    });    
}

if(document.querySelector('.search__form--button')){
    document.querySelector('.search__form--button').addEventListener('click', e =>{
        e.preventDefault();
    });
}

//////////////////////////////// Trending Controller /////////////////////////////////////////////////////

const controlTrending = async (time_window = 'day',type = 'movie') => {
    // 1. Create a instance based on the time_window
    state.trending = new Trending(time_window,type);

    // 2. Get results 
    await state.trending.getTrendingMovies()

    // 3. Prepare the UI for results
    trendingView.clearResults();

    // 4. Render results to the UI
    trendingView.renderTrending(state.trending.result,type);
};
controlTrending();

// Trending EvenListeners
const trending_today = document.querySelector('.trending__today');
if(trending_today){
    trending_today.addEventListener('click', event => {
        controlTrending('day');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

const trending_week = document.querySelector('.trending__week');
if(trending_week){
    trending_week.addEventListener('click', event => {
        controlTrending('week');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

//////////////////////////////////// Latest Trailer Section /////////////////////////////////////////////////

const controlTrailer = async () => {
    //1. Create a new Instance
    state.trailers = new LatestTrailers();
    //2. Get Results 
    await state.trailers.getTrendingResults();

    //3. Get movieInfo and VideoSrc
    const results = state.trailers.result;

    const final = await Promise.all(results.map(async cur => {
        const movieVideoSrc = await state.trailers.getTrailer(cur.id);
            const videoRes = {
                moviebackdrop: cur.backdrop_path,
                movieTitle: cur.title,
                moviePoster: cur.poster_path,
                movieVideoSrc,
            };
            return videoRes;
        })
    );
    // console.log(final);
    //4. Prepare UI for Results
    trailerView.clearResults();
    // 5.Render Results to the UI
    trailerView.renderTrailer(final);
};
controlTrailer();

///////////////////////////////////// Latest TV Shows /////////////////////////////////////////////////////

const controlTVShows = async (time_window = 'day',type='tv') => {
    // 1. Create a instance based on the time_window
    state.tvshows = new TVShows(time_window,type);

    // 2. Get results 
    await state.tvshows.getTVShows();

    // 3. Prepare the UI for results    
    tvShowsView.clearResults();
    // 4. Render results to the UI    
    tvShowsView.renderTVShows(state.tvshows.result,type);
};
controlTVShows();
const tvshows_today = document.querySelector('.tvshows_today');
if(tvshows_today){
    tvshows_today.addEventListener('click', event=>{
        controlTVShows('day');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

const tvshows_week = document.querySelector('.tvshows_week');
if(tvshows_week){
    tvshows_week.addEventListener('click', event=>{
        controlTVShows('week');
        [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('active'));
        event.target.parentNode.classList.add('active');
        spinner();
    });
}

/*******************************************------Second page-----***************************************************/

let url = window.location.href;
let params = (new URL(url)).searchParams;
let id;
let data_type;
let id_full_cast;

if(params.has('id')){
    id_full_cast = params.get('id');
}


if(params.has('id')){
     id = params.get('id');
}

if(params.has('type')){
    data_type = params.get('type');
}

const controlMovieInfo = async()=>{
    // 1. Create a new instance using the id
    state.movieInfo = new Movie_Info(`${id}`,`${data_type}`);
    // 2. Get results using the id    
    await state.movieInfo.getResults();
    // 3. Prepare the UI for results
    movieInfo.clearMediaResults();
    // 5. Render results to the UI    

    let minified_cast = [];
    let minified_Videos = [];
    let minified_Posters = [];
    let minified_backdrops = [];

    // console.log(state.movieInfo.result);
    movieInfo.renderMovieInfo(state.movieInfo.result);
       
    // Minfying cast
    if(state.movieInfo.result.casts.cast.length > 20){
        for(let i =0;i<20;i++){
            minified_cast.push(state.movieInfo.result.casts.cast[i]);
        }
    } else {
        minified_cast = state.movieInfo.result.casts.cast;
    }
    movieInfo.renderTopcast(minified_cast);

    if(state.movieInfo.result.videos.results.length > 10){
        for(let i=0;i<10;i++){
            minified_Videos.push(state.movieInfo.result.videos.results[i]);
        }
    } else {
        minified_Videos = state.movieInfo.result.videos.results;
    }
       
    movieInfo.renderVideos(minified_Videos);
    if(state.movieInfo.result.images.posters.length > 20){
         for(let i =0;i<20;i++){
            minified_Posters.push(state.movieInfo.result.images.posters[i]);
         }
    } else {
        minified_Posters = state.movieInfo.result.images.posters;
    }

    if(state.movieInfo.result.images.backdrops.length > 20){
        for(let i =0;i<20;i++){
            minified_backdrops.push(state.movieInfo.result.images.backdrops[i]);
        }
    } else {
        minified_backdrops = state.movieInfo.result.images.backdrops;
    }

    // Full cast link
    movieInfo.renderFullCastLink(id_full_cast,data_type);

    // Media section   

    if(document.querySelector('.media-videos__link')){
        document.querySelector('.media-videos__link').addEventListener('click', event => {
            [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('media-active'));
            event.target.parentNode.classList.add('media-active');
            movieInfo.clearMediaResults();
            movieInfo.renderVideos(minified_Videos);
            spinner();
        });
    }

    if(document.querySelector('.media-backdrop__link')){
        document.querySelector('.media-backdrop__link').addEventListener('click', event => {
            [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('media-active'));
            event.target.parentNode.classList.add('media-active');
            movieInfo.clearMediaResults();
            movieInfo.renderBackdrop(minified_backdrops);
            spinner();
        });
    }

    if(document.querySelector('.media-poster__link')){
        document.querySelector('.media-poster__link').addEventListener('click', event => {
            [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('media-active'));
            event.target.parentNode.classList.add('media-active');
            movieInfo.clearMediaResults();
            movieInfo.renderPoster(minified_Posters);
            spinner();
        });
    }

    // Recommendation section
    movieInfo.renderRecomendation(state.movieInfo.result.recommendations.results,data_type);
}

// Calling the ConrolMovieInfo function if the id is available
if(id){
    controlMovieInfo();
}

//****************************************TV INFO Section***********************************************************/

let tv_id,d_type;

if(params.has('tv_id')){
    tv_id = params.get('tv_id');
}

if(params.has('d_type')){
    d_type = params.get('d_type');
}

const controlTVInfo = async () =>{
    // 1. Create an instance using the id
    state.tvinfo = new TV_Info(`${tv_id}`,`${d_type}`);
    // 2. Get Results using the id
    await state.tvinfo.getResults();
    // 3. Render results to the UI
    tvInfo.renderTVInfo(state.tvinfo.result);

    // Top cast 
    tvInfo.renderTopcast(state.tvinfo.result.credits)
    // Full cast link
    tvInfo.renderFullCastLink(tv_id,d_type);
    // Media section

    let minified_Videos = [];
    let minified_Posters = [];
    let minified_backdrops = [];

    if(state.tvinfo.result.videos.results.length > 10){
        for(let i=0;i<10;i++){
            minified_Videos.push(state.tvinfo.result.videos.results[i]);
        }
    } else {
        minified_Videos = state.tvinfo.result.videos.results;
    }
       
    movieInfo.renderVideos(minified_Videos);
    if(state.tvinfo.result.images.posters.length > 20){
         for(let i =0;i<20;i++){
            minified_Posters.push(state.tvinfo.result.images.posters[i]);
         }
    } else {
        minified_Posters = state.tvinfo.result.images.posters;
    }

    if(state.tvinfo.result.images.backdrops.length > 20){
        for(let i =0;i<20;i++){
            minified_backdrops.push(state.tvinfo.result.images.backdrops[i]);
        }
    } else {
        minified_backdrops = state.tvinfo.result.images.backdrops;
    }

    // Render videos
    tvInfo.renderVideos(minified_Videos);

    if(document.querySelector('.tv-videos__link')){
        document.querySelector('.tv-videos__link').addEventListener('click', event => {
            [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('media-active'));
            event.target.parentNode.classList.add('media-active');
            tvInfo.clearMediaResults();
            tvInfo.renderVideos(minified_Videos);
            spinner();
        });
    }

    if(document.querySelector('.tv-backdrop__link')){
        document.querySelector('.tv-backdrop__link').addEventListener('click', event => {
            [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('media-active'));
            event.target.parentNode.classList.add('media-active');
            tvInfo.clearMediaResults();
            tvInfo.renderBackdrop(minified_backdrops);
            spinner();
        });
    }

    if(document.querySelector('.tv-poster__link')){
        document.querySelector('.tv-poster__link').addEventListener('click', event => {
            [...event.target.parentNode.parentNode.children].forEach(sib => sib.classList.remove('media-active'));
            event.target.parentNode.classList.add('media-active');
            tvInfo.clearMediaResults();
            tvInfo.renderPoster(minified_Posters);
            spinner();
        });        
    }
    
    // Recommendations section
    tvInfo.Recommendations(state.tvinfo.result.recommendations.results,d_type);
}
if(tv_id){
    controlTVInfo();
}

//*******************************************FUll CAST and CREW**************************************************/
let movie_id,movie_type;

if(params.has('movie_id')){
    movie_id = params.get('movie_id');
}

if(params.has('movie_type')){
    movie_type = params.get('movie_type');
}

const controlFullCastCrew = async () =>{
    // 1. Create a new instance using the id
    state.fullcastcrew = new Full_cast_crew(`${movie_id}`,`${movie_type}`);
    // 2. Get results using the ID
    await state.fullcastcrew.getFullCastCrew();
    // 3. Render Results to the UI
    console.log(state.fullcastcrew.result)
    fullCastCrew.renderheader(state.fullcastcrew.result,movie_type);
    fullCastCrew.renderfullcast(state.fullcastcrew.result, movie_type);
    fullCastCrew.renderfullcrew(state.fullcastcrew.result, movie_type);
}
if(movie_id){
    controlFullCastCrew();  
    // console.log(movie_id +  movie_type);
}

// *********************************************PEOPLE INFO SECTION********************************************** //

let peopleID;

if(params.has('people_id')){
    peopleID = params.get('people_id');
}

const controlPeopleInfo = async() =>{
    // 1. Create an instance using the id
    state.peopleinfo = new PeopleInfo(peopleID);

    // 2. Get results using the instance
    await state.peopleinfo.getResults();
    await state.peopleinfo.getExternalID();

    // 3. Render results to the UI
    peopleInfo.renderPeopleInfo(state.peopleinfo.result,state.peopleinfo.external_id);
}

if(peopleID){
    console.log(peopleID);
    controlPeopleInfo();
}

// Movie Navbar(Popular, Trending, Now playing, toprated)

let nav_movie_title,nav_movie_type;


if(params.has('m_title')){
    nav_movie_title = params.get('m_title');
}

if(params.has('m_type')){
    nav_movie_type = params.get('m_type');
}

const controlNavMovies = async () =>{
    // 1. Create an instance using the id
    state.navmovies = new NavMovies(nav_movie_title);
    // 2. Get results using the id
    await state.navmovies.getResults();
    // 3. Render results to the UI
    navMovies.renderNavMovies(state.navmovies.result.results,nav_movie_type);
    navMovies.renderNavMovieTitle(nav_movie_title);
}

if(nav_movie_title){
   controlNavMovies();
}

// TV Navbar

let nav_tv_title, nav_tv_type;

if(params.has('tv_title')){
    nav_tv_title = params.get('tv_title');
}

if(params.has('tv_type')){
    nav_tv_type = params.get('tv_type');
}

const controlNavTV = async () =>{
    // 1. Create an instance using the id
    state.navtv = new TVInfo(nav_tv_title);
    // 2. Get results using the id
    await state.navtv.getResults();
    // Render results to the UI
    console.log(state.navtv.result);
    navTV.renderNavTV(state.navtv.result.results, nav_tv_type);
    navTV.renderNavTVTitle(nav_tv_title);
}

if(nav_tv_title){
    controlNavTV();
}

// ******************************************Popular Person******************************************/

const controlPopularPerson = async () =>{
    // 1. Create an instance from the class
    state.popular_person = new PopularPerson();
   //  2. Get results using the instance
   await state.popular_person.getResults();
   //  3. Render results to the UI
   popularPerson.renderPopularPerson(state.popular_person.result.results);
}
controlPopularPerson();


//**********************************************Search Movies section*********************************************** */

let search__query,query_type;

if(params.has('query')){
    search__query = params.get('query');
}

if(params.has('query_type')){
    query_type = params.get('query_type');
}

const controlSearch = async (type,query)=>{
    // 1. Create an instance using the query
    state.search = new SearchResults(type,query);
    // 2. Get results using the instance
    await state.search.getResults();
    // 3. Prepare the UI for rendering
    searchView.clearSearch();
    // 4. Render results to the UI
    searchView.renderTitle(search__query);
    if(query_type === 'movie'){
        searchView.renderSearchMovies(state.search.result.results,query_type);
    } else if(query_type === 'tv'){
        searchView.renderSearchTV(state.search.result.results,query_type);
    } else if(query_type === 'person'){
        searchView.renderSearchPerson(state.search.result.results,query_type);
    }
}
if(search__query){
    controlSearch(query_type,search__query);
}

if(elements.search__form__button){
    elements.search__form__button.addEventListener('click',()=>{
        if(elements.search__form__textbox.value !== ''){
            const search_query = elements.search__form__textbox.value;
            if(search_query){
                // window.location.href=`./search_results.html?query=${search_query}&query_type=movie`;
                window.open(`./search_results.html?query=${search_query}&query_type=movie`,"blank");
            }
        }        
        elements.search__form__textbox.value = '';
    });
}

if(elements.search__nav_link__movies){
    elements.search__nav_link__movies.addEventListener('click', () =>{
        query_type = 'movie';
        window.location.href = `http://localhost:8080/search_results.html?query=${search__query}&query_type=movie`;
        controlSearch(query_type,search__query);
    });
}


if(elements.search__nav_link__tv){
    elements.search__nav_link__tv.addEventListener('click', () =>{
        query_type = 'tv';
        window.location.href = `http://localhost:8080/search_results.html?query=${search__query}&query_type=tv`;
        controlSearch(query_type,search__query);
    });
}


if(elements.search__nav_link__people){
    elements.search__nav_link__people.addEventListener('click', () =>{
        query_type = 'person';
        window.location.href = `http://localhost:8080/search_results.html?query=${search__query}&query_type=person`;
        controlSearch(query_type,search__query);
    });
}

// loader
function spinner(){      
    if(document.querySelector('.loader--wrapper')){
        document.querySelector('.loader--wrapper').style.display = "block";
        document.querySelector('.loader').style.display = "block";
      setTimeout(function(){         
        document.querySelector('.loader--wrapper').style.display = "none";
        document.querySelector('.loader').style.display = "none";
      }, 3000);
    }
  }
  spinner();

if(document.querySelector('#feedback__form')){
    document.querySelector('#feedback__form').addEventListener('submit',e=>{
        e.preventDefault();
        let name,email,feedback;
        name = document.querySelector('.u-name').value;
        email = document.querySelector('.u-email').value;
        feedback = document.querySelector('.u-msg').value;
        if( name !== '' && email !== '' && feedback !== ''){
            let creds = {
                name : document.querySelector('.u-name').value,
                email : document.querySelector('.u-email').value,
                feedback : document.querySelector('.u-msg').value
            }
            db.collection('contacts').add({
                name : creds.name,
                email : creds.email,
                feedback : creds.feedback 
            }).then(()=>{
                swal("Thank you!", "Your response has been submitted!", "success");
            })
        }
        document.querySelector('.u-name').value = '';
        document.querySelector('.u-email').value = '';
        document.querySelector('.u-msg').value = '';
    });
}