import {elements} from './base';

export const renderPeopleInfo = (result,ids) =>{
    let markup = `
    <section class="people-info__content">
        <div class="people-info__poster">
            <img src="${formatProfile(result.profile_path)}" alt="${result.name}" class="people-info__img">
        </div>
        <div class="people-info__details">
            <p class="details__name">${result.name}</p>
            <p class="details__overview--title">Biography</p>
            <p class="details__overview">${result.biography}.</p>
        </div>
    </section>  
    <section class="people__personal-info">
            <p class="personal-info__title">Personal Info</p>
            <div class="personal-info__wrapper">
                <div class="people__known_for">
                    <p class="known__for-title">Known For</p>
                    <p class="known__for">${result.known_for_department}</p>
                </div>
                <div class="people__gender">
                    <p class="gender-title">Gender</p>
                    <p class="gender">${formatGender(result.gender)}</p>
                </div>
                <div class="people__birth-date">
                    <p class="birthday-title">Birthday</p>
                    <p class="birthday">${result.birthday}</p>
                </div>    
                <div class="people__place-of-birth">
                    <p class="place_of_birth-title">Place of Birth</p>
                    <p class="place_of_birth">${result.place_of_birth}</p>
                </div>
                <div class="external_id">
                    <p class="external_id--title">External IDs</p>
                    
                    <div class="external_id--links">
                            <a href="https://www.instagram.com/${ids.instagram_id}" target="_blank" class="social-icon"><i class="fab fa-instagram external"></i></a>
                            <a href="https://www.facebook.com/profile.php?id=${ids.facebook_id}" target="_blank" class="social-icon"><i class="fab fa-facebook-f external"></i></a>
                            <a href="https://twitter.com/${ids.twitter_id}" target="_blank" class="social-icon"><i class="fab fa-twitter external"></i></a>
                    </div>
                </div>
            </div>            
        </section> 
    `;

    if(elements.people_info_wrapper){
        elements.people_info_wrapper.insertAdjacentHTML('beforeend',markup);
    }

}

const formatGender = (gender_id)=>{
    switch(gender_id){
        case 0 : return 'Not Specified';
        case 1 : return 'Female';
        case 2 : return 'Male';
        default : return 'None';
    }
}

const formatProfile = data =>{
    if(data === null){
        return `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStSQ82lss7_ve18guEcreG8_JSdD4qJUCiS_JfFD4K9t_Zq2rclh3Uvn0xVTC0QGpNbn4&usqp=CAU`;
    } else {
        return 'https://image.tmdb.org/t/p/w185/' + data;
    }
}