import {elements} from './base';

const markupTVShows = (tvshows,type)=>{
    let markup = `
                    <div class="movie-container">
                        <a href="./tv_info.html?tv_id=${tvshows.id}&d_type=${type}" target="blank" class="trending-movie__link">
                            <img src="https://image.tmdb.org/t/p/w185/${tvshows.poster_path}" alt="" class="movie-image">
                        </a>
                        <div class="movie-rating__container">
                            <div class="movie-rating">
                                <div class="movie-rating__inner-round">
                                    <p class="rating-percent">${createPercent(tvshows.vote_average)}</p>
                                </div>
                        </div>
                        </div>
                        <a href="./movieInfo.html?id=${tvshows.id}&type=${type}" target="blank" class="trending-movie__link">
                            <h2 class="movie-title">${tvshows.name}</h2>
                        </a>    
                        <p class="movie-releasedate">${tvshows.first_air_date}</p>
                    </div>                                     
    `;
    if(elements.tvshows__wrapper){
        elements.tvshows__wrapper.insertAdjacentHTML('beforeend', markup);
    }
};

export const renderTVShows = (results,type_value) =>{
    // results.forEach(markupTVShows);    
    for(let i=0;i<results.length;i++){
        markupTVShows(results[i],type_value);
    }
};

export const clearResults = ()=>{
    if(elements.tvshows__wrapper){
        elements.tvshows__wrapper.innerHTML = '';
    }
};

const createPercent = (vote) =>{ 
    let str = vote.toString(); 
    let percent = str.split(".").join("") + '%';
    return percent;
}