import {elements} from './base';

const markupNavMovies = (result,type) =>{
    let markup = `
    <div class="movie__content--card">
        <a href="./movieInfo.html?id=${result.id}&type=${type}" target="blank">
            <img src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="${result.title}" class="nav__movie-image">
        </a>
        <div class="nav__movie-rating__container">
            <div class="nav__movie-rating">
                <div class="nav__movie-rating__inner-round">
                    <p class="nav__rating-percent">${createPercent(result.vote_average)}</p>
                </div>
            </div>
        </div>
        <div class="nav__movie--details">
        <a href="./movieInfo.html?id=${result.id}&type=${type}" target="blank" class="nav__movie-title__link">
            <h2 class="nav__movie-title">${formatTitle(result.title)}</h2>
        </a>    
            <p class="nav__movie-releasedate">${result.release_date}</p>
        </div>  
    </div>
    `;
    if(elements.nav_movie__content){
        if(result.poster_path && result.backdrop_path ){
            elements.nav_movie__content.insertAdjacentHTML('beforeend', markup);
        }
    }

}

export const renderNavMovies = (results,type_value) =>{
    // results.forEach(markupNavMovies);
    for(let i=0;i<results.length;i++){
        markupNavMovies(results[i],type_value)
    }
}

const createPercent = (vote) =>{ 
    // console.log(vote.toString().split(".").length);
    let str = vote.toString();
    let splitted = str.split(".");
    if(splitted.length === 1){
        splitted = splitted + "0";
        return splitted + "%";
    }else{
        let percent = splitted.join("") + '%';
        return percent;
    }
}

const formatNavMovieTitle = (type) =>{
    switch(type){
        case 'popular': return 'Popular Movies';
        case 'upcoming' : return 'Upcoming Movies';
        case 'top_rated' : return 'Toprated Movies';
        case 'now_playing' : return 'Now Playing';
        default : return 'Popular Movies';

    }
}

export const renderNavMovieTitle = (type) =>{
    let markup = `${formatNavMovieTitle(type)}`;
    if(elements.nav_movie__title){
        elements.nav_movie__title.textContent = markup;
    }
}

const formatTitle = (title) =>{
    
    if(title.length > 18){
        let new_title = [];
        for(let i=0;i<15;i++){
            new_title.push(title[i]);
        }
        return new_title.join("")+' ...';
    }else{
        return title;
    }
}