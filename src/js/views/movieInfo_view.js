import {elements} from './base';

export const renderMovieInfo = (res) =>{
    // renderCredits(formatCredits(res));
    const markup = `
    <div class="movie-info__poster">
        <img src="https://image.tmdb.org/t/p/w300/${res.poster_path}" alt="Cannot load Image" class="movie-info__img">
    </div>
    <div class="movie-info__details">
        <div class="movie-info__title">${res.title} <div class="movie-info__year">(${formatYear(res.release_date)})</div></div>    
        <p class="movie-info__genre">${formatReleaseDate(res.release_date)} (US) &nbsp; &#8226; ${formatGenre(res.genres)}&nbsp; &#8226; &nbsp;${formatWatchHours(res.runtime)}</p>
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
                    <div class="crew-member__name">${formatCredits(res)[0].name}</div>
                    <div class="crew-member__dept">${formatCredits(res)[0].department}</div>
            </div>
            <div class="movie-info__crew">
                    <div class="crew-member__name">${formatCredits(res)[1].name}</div>
                    <div class="crew-member__dept">${formatCredits(res)[1].department}</div>
            </div>
            <div class="movie-info__crew">
                    <div class="crew-member__name">${formatCredits(res)[2].name}</div>
                    <div class="crew-member__dept">${formatCredits(res)[2].department}</div>
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

const formatVideos = (res) => {
    if(res.videos.results.length >0){
        return res.videos.results[0].key;
    }
}

const formatYear= (date)=>{
    return date.split("-")[0];
}

const formatReleaseDate = (date)=>{
    return date.split("-").reverse().join("/");
}

const formatGenre = (genres)=>{
    const genre = genres.map(cur => cur.name);
    return genre;
}

const formatWatchHours = (runtime)=>{
    var num = runtime;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
}

const formatPercent = (vote)=>{
    // return vote.split(".").join("");
    let first_part,second_part,final;
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

const formatCredits = (result)=>{
       const credits = [];
       const director = [];
       result.casts.cast.forEach(cur =>{
           if(cur.known_for_department === 'Directing'){
               director.push({
                   name: cur.name,
                   department : cur.known_for_department
               });
           }
       });
       if(director.length === 0){
           result.casts.crew.forEach(cur =>{
               if(cur.known_for_department === 'Directing'){
                   director.push({
                       name: cur.name,
                       department : cur.known_for_department
                   });
               }
           });
       }
    //    console.log(director);

    //    Screenplay
   
       const screenplay = [];
   
       result.casts.cast.forEach(cur =>{
           if(cur.known_for_department === 'Writing'){
               screenplay.push({
                   name: cur.name,
                   department : cur.known_for_department
               });
           }
       });
       
       if(screenplay.length === 0){
           result.casts.crew.forEach(cur =>{
               if(cur.known_for_department === 'Writing'){
                   screenplay.push({
                       name: cur.name,
                       department : cur.known_for_department
                   });
               }
           });
       }
    //    console.log(screenplay);

    //    Production
   
       const production = [];
       result.casts.cast.forEach(cur =>{
           if(cur.known_for_department === 'Production'){
               production.push({
                name: cur.name,
                department : cur.known_for_department
            });
           }
       });

       if(production.length === 0){
        result.casts.crew.forEach(cur =>{
            if(cur.known_for_department === 'Production'){
                production.push({
                    name: cur.name,
                    department : cur.known_for_department
                });
            }
        });
    }
    // console.log(production);

    // Camera

    const camera = [];
       result.casts.cast.forEach(cur =>{
           if(cur.known_for_department === 'Camera'){
               camera.push({
                name: cur.name,
                department : cur.known_for_department
            });
           }
       });

       if(camera.length === 0){
        result.casts.crew.forEach(cur =>{
            if(cur.known_for_department === 'Camera'){
                camera.push({
                    name: cur.name,
                    department : cur.known_for_department
                });
            }
        });
    }
    // console.log(camera);

    // Acting

    const acting = [];
       result.casts.cast.forEach(cur =>{
           if(cur.known_for_department === 'Acting'){
               acting.push({
                name: cur.name,
                department : cur.known_for_department
            });
           }
       });

       if(acting.length === 0){
        result.casts.crew.forEach(cur =>{
            if(cur.known_for_department === 'Acting'){
                acting.push({
                    name: cur.name,
                    department : cur.known_for_department
                });
            }
        });
    }
    // console.log(acting);

    // Editing

    const editing = [];
       result.casts.cast.forEach(cur =>{
           if(cur.known_for_department === 'Editing'){
               editing.push({
                name: cur.name,
                department : cur.known_for_department
            });
           }
       });

       if(editing.length === 0){
        result.casts.crew.forEach(cur =>{
            if(cur.known_for_department === 'Editing'){
                editing.push({
                    name: cur.name,
                    department : cur.known_for_department
                });
            }
        });
    }
    // console.log(editing);

    // Art

    const art = [];
       result.casts.cast.forEach(cur =>{
           if(cur.known_for_department === 'Art'){
               art.push({
                name: cur.name,
                department : cur.known_for_department
            });
           }
       });

       if(art.length === 0){
        result.casts.crew.forEach(cur =>{
            if(cur.known_for_department === 'Art'){
                art.push({
                    name: cur.name,
                    department : cur.known_for_department
                });
            }
        });
    }
    // console.log(art);

    if(director.length>0){
        credits.push(director[0]);
    }
    if(screenplay.length>0){
        credits.push(screenplay[0]);
    }
    if(production.length>0){
        credits.push(production[0]);
    }
    if(camera.length > 0){
        credits.push(camera[0]);
    }
    if(acting.length >0){
        credits.push(acting[0]);
    }
    if(editing.length >0){
        credits.push(editing[0]);
    }
    if(art.length > 0){
        credits.push(art[0]);
    }
    return credits;
   };

   const markupCredits = (credits_data) =>{
    const markup = `
        <div class="movie-info__crew">
            <div class="crew-member__name">${credits_data.name}</div>
            <div class="crew-member__dept">${credits_data.department}</div>
        </div>`;
        
        // document.querySelector('.movie-info__crew-wrapper').insertAdjacentElement('beforeend',markup);
   }

   const renderCredits = (results) =>{
       results.forEach(markupCredits);
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

export const renderTopcast = (cast)=>{
    cast.forEach(markupTopcast);
}

// Media

const markupVideos = (videoSrc)=>{
    const markup = `
                <div class="media-content__card">   
                    <iframe class="media-content__videos" src="https://www.youtube.com/embed/${videoSrc.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>`;
            
        if(elements.media_content__scroller){
            elements.media_content__scroller.insertAdjacentHTML('beforeend',markup);
        }
}

export const renderVideos = (results) =>{
    results.forEach(markupVideos);
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
        elements.media_content__scroller.insertAdjacentHTML('beforeend',markup);
    }       
}

export const renderPoster = (results) =>{
    results.forEach(markupPoster);
}

// Recommedation section

const markupRecommedation = (rcmds, type)=>{
    const markup = `    
        <a href="./movieInfo.html?id=${rcmds.id}&type=${type}" target="blank" class="rcmds_link">
            <div class="rcmd-content__card">
                <div class="rcmd-content__movie-poster">
                <a href="./movieInfo.html?id=${rcmds.id}&type=${type}" target="blank" class="rcmds_link">
                    <img src="https://image.tmdb.org/t/p/w300/${rcmds.backdrop_path}" alt="${rcmds.title}" class="rcmd-content-image">
                </a>
                </div>
                <div class="rcmd-content__movie-title--wrapper">
                <a href="./movieInfo.html?id=${rcmds.id}&type=${type}" target="blank" class="rcmds_link">
                    <div class="rcmd-content__movie-title">${rcmds.title}</div>
                </a>
                    <div class="rcmd-content__movie-rating">${formatPercent(rcmds.vote_average.toString())}%</div>
                </div>
            </div>
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

export const renderRecomendation = (results, type)=>{
    // results.forEach(markupRecommedation);
    for(let i=0;i<results.length;i++){
        markupRecommedation(results[i],type);
    }
}


