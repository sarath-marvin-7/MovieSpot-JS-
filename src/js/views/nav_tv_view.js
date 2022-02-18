import {elements} from './base';

const markupNavTV = (result,type) =>{
    let markup = `
    <div class="tv__content--card">
        <a href="./tv_info.html?tv_id=${result.id}&d_type=${type}" target="blank">
            <img src="https://image.tmdb.org/t/p/w185/${result.poster_path}" alt="${result.name}" class="nav__tv-image">
        </a>
        <div class="nav__tv-rating__container">
            <div class="nav__tv-rating">
                <div class="nav__tv-rating__inner-round">
                    <p class="nav__rating-percent">${createPercent(result.vote_average)}</p>
                </div>
            </div>
        </div>
        <div class="nav__tv--details">
        <a href="./tv_info.html?tv_id=${result.id}&d_type=${type}" target="blank" class="nav__movie-title__link">
            <h2 class="nav__tv-title">${formatTitle(result.name)}</h2>
        </a>
            <p class="nav__tv-releasedate">${formatDate(result.first_air_date)}</p>
        </div>  
    </div>
    `;
    if(elements.nav_tv__content){
        if(result.poster_path && result.backdrop_path ){
            elements.nav_tv__content.insertAdjacentHTML('beforeend', markup);
        }
    }

}

export const renderNavTV = (results,type_value) =>{
    // results.forEach(markupNavMovies);
    for(let i=0;i<results.length;i++){
        markupNavTV(results[i],type_value)
    }
}

const createPercent = (vote) =>{ 
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

const formatNavTVTitle = (type) =>{
    switch(type){
        case 'popular': return 'Popular TV Shows';
        case 'airing_today' : return 'Airing Today';
        case 'top_rated' : return 'Toprated Shows';
        case 'on_the_air' : return 'On TV';
        default : return 'Popular TV Shows';
    }
}

export const renderNavTVTitle = (type) =>{
    let markup = `${formatNavTVTitle(type)}`;
    if(elements.nav_tv__title){
        elements.nav_tv__title.textContent = markup;
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

const formatDate = (date) =>{
    if(date === ''){
        return "Not Specified";
    } else { 
        return date;
    }
}