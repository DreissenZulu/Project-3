import React from 'react';
import axios from 'axios';

function ProfilePage(props) {
    let profileInfo = props.profileInfo;

    let activeField = null;
    let currUser_localStorage = props.currUser.id;
    let currUser_url = Number(props.profileID);
    let sameUser = currUser_localStorage === currUser_url;


    let docBody = document.querySelector('body');
    docBody.addEventListener('click', async(e)=>{
        updateBy_clickOut(e);
    });

    let create_updateObj = ()=>{
        let updateObj = {};
            updateObj.name     = document.querySelector('.profileName').innerHTML;
            updateObj.title     = document.querySelector('.profileTitle').innerHTML;
            updateObj.location = document.querySelector('.profileLocation').innerHTML;
            updateObj.number   = document.querySelector('.profileNumber').innerHTML;
            updateObj.bio      = document.querySelector('.bio_plate').innerHTML;
            updateObj.id       = JSON.parse(window.localStorage.getItem('currUser')).id;

        return updateObj;
    };

    /* Double Click makes field
    - make contenteditable
    - wipe field of placeholder text
    - take focus
    - set as activeField */
    let editFieldInit = function(e){
        let thisField = e.target;
        thisField.setAttribute("contenteditable", "true");
        if(thisField.innerHTML[0] == '+'){thisField.innerHTML = ''};
        thisField.focus();
        activeField = thisField;
    };

    let fieldEmpty_getPlaceholder = (thisField)=>{
        if(thisField.innerHTML.trim() == ''){
            let unique = null;
            if(thisField.classList.contains('profileName')){
                unique = 'name';
            }
            else if(thisField.classList.contains('profileTitle')){
                unique = 'title';
            }
            else if(thisField.classList.contains('profileLocation')){
                unique = 'location';
            }
            else if(thisField.classList.contains('profileNumber')){
                unique = 'number';
            }
            else if(thisField.classList.contains('bio_plate')){
                unique = 'bio';
            };
            thisField.innerHTML = `+ add a ${unique}`;
        };
    };

    let updateBy_clickOut = async(e)=>{
        let coords = [e.x, e.y];
        if(activeField != null
        && isWithin(coords, activeField) == false){
            updateField(activeField);
        };
    };

    let updateBy_enter = async(e)=>{
        if(e.key == "Enter"){
            let thisField = e.target;
            updateField(thisField);
        };
    };

    /* Updating a field involves:
    - remove contenteditable
    - if empty, add placeholder text back
    - create and send updateObj to DB
    - set activeField to null */
    let updateField = async(thisField)=>{
            thisField.removeAttribute('contenteditable');
            fieldEmpty_getPlaceholder(thisField);
            let updateObj = create_updateObj();
            await axios.put(`/user`, updateObj);
            activeField = null;
    };


    function isWithin(coords, elem){
    	let x = coords[0];
    	let y = coords[1];

    	let elem_left   = elem.getBoundingClientRect().left;
    	let elem_right  = elem.getBoundingClientRect().right;
    	let elem_top    = elem.getBoundingClientRect().top;
    	let elem_bottom = elem.getBoundingClientRect().bottom;

    	if(x > elem_left
    	&& x < elem_right
    	&& y > elem_top
    	&& y < elem_bottom){
    		return true;
    	}
    	else{
    		return false;
    	};
    };

    let addComment = ()=>{

        let html = `
            <div class="comment_plate" contenteditable="true">
                <div class="commentStarWrap" contenteditable="false">
                    <i class="far fa-star 0"></i>
                    <i class="far fa-star 1"></i>
                    <i class="far fa-star 2"></i>
                    <i class="far fa-star 3"></i>
                    <i class="far fa-star 4"></i>
                </div>
            </div>
        `;

        let comments_wrap = document.querySelector('.comments_wrap');
        comments_wrap.insertAdjacentHTML('afterbegin', html);

        let wipeStars = ()=>{
            let stars = document.querySelectorAll('.commentStarWrap > i');
            for(let i = 0; i < stars.length; i++){
                let star = stars[i];
                star.classList.add('far');
                star.classList.remove('fas');
            };
        };

        let newlyAddedStarWrap = document.querySelector('.commentStarWrap:first-of-type');
        newlyAddedStarWrap.addEventListener('click', function(e){
            let target = e.target;
            let stars = document.querySelectorAll('.commentStarWrap > i');
            let rating = null;

            for(let i = 0; i < stars.length; i++){
                let star = stars[i];
                if(target == star){
                    rating = i;
                };
            };

            for(let i = 0; i < stars.length; i++){
                let star = stars[i];
                if(i <= rating){
                    star.classList.add('fas');
                    star.classList.remove('far');
                }
                else{
                    star.classList.add('far');
                    star.classList.remove('fas');
                };
            };
        });

        let newlyAddedComment = document.querySelector('.comment_plate:first-of-type');
        newlyAddedComment.focus();
    };


    return (
        <div className="profile_wrap">
            <div className="profile_flex">
                <div className="info_wrap">
                    <div> {/* react wrap */}
                        <img className="rounded-pf-image" src="https://randomuser.me/api/portraits/men/87.jpg" alt="random user" />
                        <h3 className="stars_wrap">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </h3>
                        <h1 className="profileName" onDoubleClick={sameUser ? editFieldInit : ""} onKeyDown={sameUser ? updateBy_enter : ""}>
                            {`${profileInfo.firstName} ${profileInfo.lastName}`}
                        </h1>
                        <p className="profileTitle" onDoubleClick={sameUser ? editFieldInit : ""} onKeyDown={sameUser ? updateBy_enter : ""}>
                            {profileInfo.title ? profileInfo.title : "+ add a title"}
                        </p>
                        <div className="profileEmail">
                            {profileInfo.email}
                        </div>
                        <div className="profileLocation" onDoubleClick={sameUser ? editFieldInit : ""} onKeyDown={sameUser ? updateBy_enter : ""}>
                            {`${profileInfo.city} ${profileInfo.country}`}
                        </div>
                        <div className="profileNumber" onDoubleClick={sameUser ? editFieldInit : ""} onKeyDown={sameUser ? updateBy_enter : ""}>
                            {profileInfo.phoneNumber ? profileInfo.phoneNumber : "+ add a number"}
                        </div>
                        <div className="links_wrap">

                        </div>
                    </div> {/* END react wrap */}
                </div> {/* END info_wrap */}
                <div className="bioAndComments_wrap">
                    <div className="bio_wrap">
                        <div className="bio_plate" onDoubleClick={sameUser ? editFieldInit : ""} onKeyDown={sameUser ? updateBy_enter : ""}>
                            {profileInfo.bio ? profileInfo.bio : "+ add a bio"}
                        </div>
                    </div>
                    <div className="addCommentButton" onClick={addComment}>+</div>
                    <div className="comments_wrap">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
