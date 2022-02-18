import {elements} from './base';
export const markupTrending = (trending,type)=>{    
    let markup = `<div class="movie-container">
                    <a href="./movieInfo.html?id=${trending.id}&type=${type}" target="blank" class="trending-movie__link">
                        <img src="https://image.tmdb.org/t/p/w185/${trending.poster_path}" alt="" class="movie-image">
                    </a>
                        <div class="movie-rating__container">
                            <div class="movie-rating">
                                <div class="movie-rating__inner-round">
                                    <p class="rating-percent">${createPercent(trending.vote_average)}</p>
                                </div>
                            </div>
                        </div>
                        <a href="./movieInfo.html?id=${trending.id}&type=${type}" target="blank" class="trending-movie__link">
                            <h2 class="movie-title">${trending.title}</h2>
                        </a>
                        <p class="movie-releasedate">${trending.release_date}</p>
                    </div>`;
                    if(elements.trending__moviewrapper){
                        elements.trending__moviewrapper.insertAdjacentHTML('beforeend', markup);
                    }
};

export const clearResults = ()=>{
    if(elements.trending__moviewrapper){
        elements.trending__moviewrapper.innerHTML = '';
    }
};

export const renderTrending = (results,type_value) =>{
    // results.forEach(markupTrending);
    for(let i=0;i<results.length;i++){
        if(results[i].poster_path && results[i].backdrop_path ){
            markupTrending(results[i],type_value);
        }
    }
};

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

