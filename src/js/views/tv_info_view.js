import {elements} from './base';
const formatPercent = (vote)=>{
    // return vote.split(".").join("");
    let first_part,second_part,final;
    if(vote === '10'){
        return vote+'0';
    }else{
        if(vote.length > 1){
            const seperated = vote.split(".");
            first_part = seperated[0];
            if(seperated[1].length > 0){
                 second_part = seperated[1][0];
            }
            final = first_part + second_part;
            return final;
        } else{
            final = vote + '0';
            return final;
        }
    }
}

export const renderTVInfo = (res) =>{
    const markup = `
    <div class="movie-info__poster">
        <img src="https://image.tmdb.org/t/p/w300/${res.poster_path}" alt="${res.name}" class="movie-info__img">
    </div>
    <div class="movie-info__details">
        <div class="movie-info__title">${res.name} <div class="movie-info__year">(${formatYear(res.first_air_date)})</div></div>    
        <p class="movie-info__genre">${formatReleaseDate(res.first_air_date)} (US) &nbsp; &#8226; ${formatGenre(res.genres)}&nbsp; &#8226; &nbsp;${formatWatchHours(res.episode_run_time)}</p>
        <div class="movie-info__user-score">
                <div class="movie-info__rating">
                    <div class="movie-info__rating__inner-round">
                        <p class="info__rating-percent">${formatPercent(res.vote_average.toString())}%</p>
                    </div>
                </div>
                <p class="rating-user-score">User Score</p>
                <div class="user-score__play-trailer">
                    <a href="https://youtube.com/watch?v=${formatVideos(res)}" class="user-score__play-trailer--link" target="_blank">
                        <div class="play-trailer__btn effect">
                            <img src="./img/play.png" alt="play trailer" class="user-score__play-trailer--icon">
                            <p class="user-score__play-trailer-text">play trailer</p>
                        </div>    
                    </a>
                </div>
            </div>
        <div class="movie-info__overview">
            <p class="overview-title">Overview</p>
            <p class="overview-content">${res.overview}</p>
        </div>

        <div class="movie-info__crew-wrapper">
            <div class="movie-info__crew">
                    <div class="crew-member__created">Created By</div>
                    <div class="crew-member__name">${formatCreatedBy(res.created_by)}</div>
            </div>
        </div>
    </div>`;
    
    if(elements.movieInfo_container){
        elements.movieInfo_container.style.backgroundImage = `linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${res.backdrop_path})`;
        elements.movieInfo_container.style.backgroundPostion = "center";
        elements.movieInfo_container.style.backgroundRepeat = "no-repeat";
        elements.movieInfo_container.style.backgroundSize = "cover";
    }

    if(elements.movieInfo_container){
        elements.movieInfo_container.insertAdjacentHTML('beforeend', markup);
    }
}

const formatCreatedBy = (created_by) =>{
    let not_mentioned = "Not Mentioned";
    if(created_by.length === 0){
        return not_mentioned;
    }else{
        return created_by[0].name;
    }
}

const formatVideos = (res) => {
    if(res.videos.results.length >0){
        return res.videos.results[0].key;
    }
}

const formatYear= (date)=>{
    if(date === null){
        return "Not mentioned";
    }else{
        return date.split("-")[0];
    }
}

const formatReleaseDate = (date)=>{
    if(date === null){
        return "Not mentioned"
    }else{
        return date.split("-").reverse().join("/");
    }
}

const formatGenre = (genres)=>{
    const genre = genres.map(cur => cur.name);
    return genre;
}

const formatWatchHours = (runtime)=>{

    var num = runtime[0];
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";   
}



   
// Top billed cast

const markupTopcast = (result)=>{
    const markup = `        
            <div class="cast-card__wrapper">
            <a href="./people_info.html?people_id=${result.id}" target="blank" class="topcast__link">
                <img src="https://image.tmdb.org/t/p/w185/${result.profile_path}" alt="${result.name}" class="cast__image">
            </a>    
                <div class="cast-card__content">
                <a href="./people_info.html?people_id=${result.id}" target="blank" class="topcast__link">
                    <div class="cast__name">${result.name}</div>
                </a>    
                    <div class="cast__character">${result.character}</div>
                </div>
            </div>
    `;
    if(elements.topcast_scroller){
        if(result.profile_path){
            elements.topcast_scroller.insertAdjacentHTML('beforeend', markup);
        }
    }
}

const markup404 = ()=>{
    const markup = `
        <img src="https://image.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg" alt="Result no found" class="result__not-found">
    `;
    if(elements.topcast_scroller){
            elements.topcast_scroller.insertAdjacentHTML('beforeend', markup);
    }
}

const markup404Media = ()=>{
    const markup = `
        <img src="https://image.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg" alt="Result no found" class="result__not-found">
    `;
    if(elements.media_content__scroller){
            elements.media_content__scroller.insertAdjacentHTML('beforeend', markup);
    }
}

export const renderTopcast = (credits)=>{
    if(credits.cast.length === 0){
        markup404();
    }
    else{
        credits.cast.forEach(markupTopcast);
    }
}

// Media

const markupVideos = (videoSrc)=>{
    const markup = `
                <div class="media-content__card">   
                    <iframe class="media-content__videos" width="500" height="315" src="https://www.youtube.com/embed/${videoSrc.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`;
            
        if(elements.media_content__scroller){
            elements.media_content__scroller.insertAdjacentHTML('beforeend',markup);
        }
}

export const renderVideos = (results) =>{
    if(results.length === 0){
        markup404Media();
    }else{
        results.forEach(markupVideos);
    }
}

export const clearMediaResults = ()=> {
    if(elements.media_content__scroller){
        elements.media_content__scroller.innerHTML = '';
    }
};

// Media backdrops

const markupBackdrop = (backdrop_data) =>{
    const markup = `
        <div class="media-content__backdrop">
             <img src="https://image.tmdb.org/t/p/w500/${backdrop_data.file_path}" alt="Cannot display image" class="backdrop-image">
        </div>
    `;
    
    if(elements.media_content__scroller){
        elements.media_content__scroller.insertAdjacentHTML('beforeend',markup);
    }   
}

export const renderBackdrop = (results) =>{
    results.forEach(markupBackdrop);
}

// Media posters

const markupPoster = (poster_data)=>{
    const markup = `
        <div class="media-content__poster">
            <img src="https://image.tmdb.org/t/p/w185/${poster_data.file_path}" alt="Cannot display Image" class="poster-image">
        </div>
    `;

    if(elements.media_content__scroller){
        if(poster_data.file_path){
            elements.media_content__scroller.insertAdjacentHTML('beforeend',markup);
        }
    }       
}

export const renderPoster = (results) =>{
    results.forEach(markupPoster);
}

// Recommedation section

const markupRecommedation = (rcmds, type)=>{
    const markup = `            
            <div class="rcmd-content__card">
                <div class="rcmd-content__movie-poster">
                <a href="./tv_info.html?tv_id=${rcmds.id}&d_type=${type}" target="blank" class="rcmds_link">
                    <img src="https://image.tmdb.org/t/p/w300/${rcmds.backdrop_path}" alt="${rcmds.name}" class="rcmd-content-image">
                </a>
                </div>
                <div class="rcmd-content__movie-title--wrapper">
                <a href="./tv_info.html?tv_id=${rcmds.id}&d_type=${type}" target="blank" class="rcmds_link">
                    <div class="rcmd-content__movie-title">${rcmds.name}</div>
                </a>
                    <div class="rcmd-content__movie-rating">${formatPercent(rcmds.vote_average.toString())}%</div>
                </div>
            </div>
        </a>
    `;
    if(elements.rcmd_content__scroller){
        elements.rcmd_content__scroller.insertAdjacentHTML('beforeend',markup);
    }
}

export const renderFullCastLink = (movie_id,movie_type) =>{
    let markup = `
            <a href="./full_cast_crew.html?movie_id=${movie_id}&movie_type=${movie_type}" target="blank" class="full-cast__link">Full cast & crew</a>
    `;
    if(elements.full_cast){
        elements.full_cast.insertAdjacentHTML('beforeend',markup);
    }
}

// export const renderRecomendation = (results, type)=>{
//     // results.forEach(markupRecommedation);
//     for(let i=0;i<results.length;i++){
//         markupRecommedation(results[i],type);
//     }
// }

const markup404Rcmds = () =>{
    const markup = `
        <img src="https://image.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg" alt="Result no found" class="result__not-found">
    `;
    if(elements.rcmd_content__scroller){
            elements.rcmd_content__scroller.insertAdjacentHTML('beforeend', markup);
    }
}

export const Recommendations = (results, type)=>{
        // results.forEach(markupRecommedation);
        if(results.length === 0){
            markup404Rcmds();
        } else{
            for(let i=0;i<results.length;i++){
                markupRecommedation(results[i],type);
            }
        }
}