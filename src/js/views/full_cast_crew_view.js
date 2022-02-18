import {elements} from './base';

export const renderheader = (movie_data,type)=>{
    let markup = `
        <img src="https://image.tmdb.org/t/p/w185/${movie_data.poster_path}" alt="${movie_data.title}" class="cast-crew__image">
        <p class="cast-crew__title">${formatTitle(movie_data,type)}</p>
        <p class="cast-crew__release-year">(${formatYear(movie_data,type)})</p>`;
        if(elements.crew_cast__header){
            elements.crew_cast__header.insertAdjacentHTML('beforeend',markup);
        }
}

const formatTitle = (movie_data,type) =>{
    if(type === "movie"){
        return movie_data.title;
    } else if(type === 'tv'){
        return movie_data.name;
    }
}

const formatYear= (date,type)=>{
    if(type === 'movie'){
        return date.release_date.split("-")[0];
    } else if(type === 'tv'){
        return date.first_air_date.split("-")[0];
    }
}

const markupfullcast = (casts_data)=>{
    let markup = `
    <div class="content__cast--card">
        <a href="./people_info.html?people_id=${casts_data.id}" target="blank" class="topcast__link">
            <img src="https://image.tmdb.org/t/p/w185//${casts_data.profile_path}" alt="${casts_data.name}" class="card__image">
        </a>
        <div class="content__cast--details">
            <a href="./people_info.html?people_id=${casts_data.id}" target="blank" class="topcast__link">
                <p class="card__name">${casts_data.name}</p>
            </a>    
            <p class="card__department">${casts_data.known_for_department}</p>
        </div>
    </div>`;
    if(elements.content_cast__card__wrapper){
        if(casts_data.profile_path){
            elements.content_cast__card__wrapper.insertAdjacentHTML('beforeend',markup);
        }
    }
}

export const renderfullcast = (results,type) =>{
    if(type === 'movie'){
        results.casts.cast.forEach(markupfullcast);
    } else if(type === 'tv'){
        results.credits.cast.forEach(markupfullcast);
    }
}

const markupfullcrew = (crew_data) =>{
    let markup = `
    <div class="content__crew--card">
        <a href="./people_info.html?people_id=${crew_data.id}" target="blank" class="topcast__link">
           <img src="https://image.tmdb.org/t/p/w185//${crew_data.profile_path}" alt="${crew_data.name}" class="card__image">
        </a>
        <div class="content__crew--details">
        <a href="./people_info.html?people_id=${crew_data.id}" target="blank" class="topcast__link">
            <p class="card__name">${crew_data.name}</p>
        </a>
            <p class="card__department">${crew_data.known_for_department}</p>
        </div>
    </div>`;
    if(elements.content_crew__card__wrapper){
        if(crew_data.profile_path){
            elements.content_crew__card__wrapper.insertAdjacentHTML('beforeend', markup);
        }
    }
}

export const renderfullcrew = (results,type) =>{
    if(type === 'movie'){
        results.casts.crew.forEach(markupfullcrew);
    } else if(type === 'tv'){
        results.credits.crew.forEach(markupfullcrew);
    }
}
