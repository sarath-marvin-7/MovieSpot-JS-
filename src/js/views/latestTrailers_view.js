import {elements} from './base';

const markupTrailer = (trailer)=>{
    if(trailer.movieVideoSrc){
    let markup = `
                <div class="trailer-card">
                    <div class="trailer__image--wrapper">
                    <h1>Hello</h1>
                        <a class="image play-trailer" data-title="${trailer.movieTitle}" href="https://www.youtube.com/watch?v=${trailer.movieVideoSrc.key}" target="_blank">
                            <img src="https://image.tmdb.org/t/p/w300/${trailer.moviebackdrop}" alt="${trailer.movieTitle}" class="play-trailer__image">
                            <div class="play">
                                <svg class="play-trailer__icon">
                                    <use xlink:href="../img/sprite.svg#play"></use>
                                </svg>  
                            </div>
                        </a>
                    </div>
                    <div class="trailer__content">
                        <h2>
                            <a href="#" class="trailer__name"> ${trailer.movieTitle}</a>
                        </h2>                                                          
                        <h3 class="trailer__details">${trailer.movieVideoSrc.name} | ${trailer.movieVideoSrc.site}</h3>
                    </div>
                </div>
    `;
    if(elements.trailer__wrapper){
        elements.trailer__wrapper.insertAdjacentHTML('beforeend', markup);
    }
    }  
};

export const renderTrailer = (results) =>{
    results.forEach(markupTrailer);    
};

export const clearResults = ()=>{
    if(elements.trailer__wrapper){
        elements.trailer__wrapper.innerHTML = '';
    }
};