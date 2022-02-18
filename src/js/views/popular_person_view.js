import {elements} from './base';

const markupPopularPerson = (result) =>{
    let markup = `    
        <div class="person__content--card">
            <a href="./people_info.html?people_id=${result.id}" target="blank" class="topcast__link">
                <img src="https://image.tmdb.org/t/p/w185/${result.profile_path}" alt="${result.name}" class="person__content--image">
                <div class="person__card--details">
                    <p class="person__details--name">${result.name}</p>
                </div>
            </a>
        </div>
    `;
    if(elements.person_cards__wrapper){
        elements.person_cards__wrapper.insertAdjacentHTML('beforeend',markup);
    }
}

export const renderPopularPerson = (results) =>{
    results.forEach(markupPopularPerson);
}