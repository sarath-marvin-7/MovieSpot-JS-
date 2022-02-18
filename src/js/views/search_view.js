import {elements} from './base';

const markupSearchMovies = (movie_data,type) =>{
    let markup = `
        <div class="search__content--card">
            <div class="search__card--image-container">
                <a href="./movieInfo.html?id=${movie_data.id}&type=${type}" target="blank">
                    <img src="${formatProfile(movie_data.poster_path)}" alt="${movie_data.title}" class="search__card--image">
                </a>
            </div>
            <div class="search__card--details">
                <a href="./movieInfo.html?id=${movie_data.id}&type=${type}" target="blank" class="movie-search__link">
                    <p class="search__card--title">${movie_data.title}</p>
                </a>
                <p class="search__card--releasedate">${formatDate(movie_data.release_date)}</p>
                <p class="search__card--overview">${formatOverview(movie_data.overview)}</p>
            </div>
        </div>    
    `;
    if(elements.search__content){
        elements.search__content.insertAdjacentHTML('beforeend',markup);
    }
}

export const renderSearchMovies = (results,type_value) =>{
    if(results.length > 0){
        for(let i=0;i<results.length;i++){
            markupSearchMovies(results[i],type_value);
        }
    } else{
        elements.search__content.insertAdjacentHTML('beforeend', '<p class="no-results">No results matched for this query...</p>');
    }
}

const formatProfile = (path) =>{
    if(path === null){
        return 'https://comnplayscience.eu/app/images/notfound.png';
    } else{
        return 'https://image.tmdb.org/t/p/w185/' + path;
    }
}

const formatDate = (date) =>{
    if(date === ''){
        return 'Not Specified';
    } else{
        return date;
    }
}

export const renderTitle = (query) =>{
    let markup = `Search Results for : ${query}`;
    elements.search__query.textContent = markup;
}

const formatOverview = (data) =>{
    if(data.length > 245){
        let newdata = [];
        for(let i=0;i<245;i++){
            newdata.push(data[i]);
        }
        return newdata.join("")+'...';
    } else{
        return data;
    }
}

export const clearSearch = () =>{
    if(elements.search__content){
        elements.search__content.innerHTML = '';
    }
}

const markupSearchTV = (tv_data,type) =>{
    let markup = `
    <div class="search__content--card">
        <div class="search__card--image-container">
            <a href="./tv_info.html?tv_id=${tv_data.id}&d_type=${type}" target="blank" class="trending-movie__link">
                <img src="${formatProfile(tv_data.poster_path)}" alt="${tv_data.name}" class="search__card--image">
            </a>
        </div>
        <div class="search__card--details">
            <a href="./movieInfo.html?id=${tv_data.id}&type=${type}" target="blank" class="movie-search__link">
                <p class="search__card--title">${tv_data.name}</p>
            </a>
            <p class="search__card--releasedate">${formatDate(tv_data.first_air_date)}</p>
            <p class="search__card--overview">${formatOverview(tv_data.overview)}</p>
        </div>
    </div>`;
    if(elements.search__content){
        elements.search__content.insertAdjacentHTML('beforeend',markup);
    }
}

export const renderSearchTV = (results,type_value) =>{
    if(results.length > 0){
        for(let i=0;i<results.length;i++){
            markupSearchTV(results[i],type_value);
        }
    } else {
        elements.search__content.insertAdjacentHTML('beforeend', '<p class="no-results">No results matched for this query...</p>');
    }
}

const markupSearchPerson = (person_data,type) =>{
    console.log(person_data);
    let markup =`
    <div class="search__person--card">
        <a href="./people_info.html?people_id=${person_data.id}" target="blank" class="topcast__link">
            <img src="${formatProfilePerson(person_data.profile_path)}" alt="${person_data.name}" class="search__person--image">
            <div class="person__card--details">
                <p class="search__details--name">${person_data.name}</p>
            </div>
        </a>
    </div>`;
    if(elements.search__content){
        elements.search__content.insertAdjacentHTML('beforeend',markup);
    }
}

export const renderSearchPerson = (results,type_value) =>{
    if(results.length > 0){
        for(let i=0;i<results.length;i++){
            markupSearchPerson(results[i],type_value);
        }
    } else{
        elements.search__content.insertAdjacentHTML('beforeend', '<p class="no-results">No results matched for this query...</p>');
    }
}

const formatProfilePerson = data =>{
    if(data === null){
        return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStSQ82lss7_ve18guEcreG8_JSdD4qJUCiS_JfFD4K9t_Zq2rclh3Uvn0xVTC0QGpNbn4&usqp=CAU`;
    } else{
        return 'https://image.tmdb.org/t/p/w185/' + data;
    }
}