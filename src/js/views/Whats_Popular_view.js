import {elements} from './base';
export const markupPopular = (popular,type)=>{
    let markup = `  <div class="movie-container">
                        <a href="./movieInfo.html?id=${popular.id}&type=${type}" target="blank">
                            <img src="https://image.tmdb.org/t/p/w185/${popular.poster_path}" alt="Cannot display image" class="movie-image">
                        </a>
                        <div class="movie-rating__container">
                            <div class="movie-rating">
                                <div class="movie-rating__inner-round">
                                    <p class="rating-percent">${createPercent(popular.vote_average)}</p>
                                </div>
                        </div>
                        </div>
                        <a href="./second.html?id=${popular.id}" target="_blank" class="movie-title__link">
                            <h2 class="movie-title">${popular.title}</h2>
                        </a>
                        <p class="movie-releasedate">${popular.release_date}</p>
                    </div>`; 
    if(elements.moviewrapper){
        elements.moviewrapper.insertAdjacentHTML('beforeend', markup);
    }
};

export const clearResults = ()=>{
    if(elements.moviewrapper){
        elements.moviewrapper.innerHTML = '';
    }
};

export const renderPopular = (results,type_value) =>{
            // results.forEach(markupPopular);
        for(let i = 0; i<results.length;i++){
            if(results[i].poster_path && results[i].backdrop_path ){
                markupPopular(results[i],type_value);
            }
        }
};

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
