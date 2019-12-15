import React from 'react';
import axios from 'axios';

function ProfilePage(props) {
    let profileInfo = props.profileInfo;

    let activeField = null;

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

    let docBody = document.querySelector('body');
    docBody.addEventListener('click', async(e)=>{
        updateBy_clickOut(e);
    });

    let addComment = ()=>{
        let html = `<div class="comment_plate" contenteditable="true"></div>`;

        let comments_wrap = document.querySelector('.comments_wrap');
        comments_wrap.insertAdjacentHTML('afterbegin', html);

        let newlyAddedComment = document.querySelector('.comment_plate:first-of-type');
        newlyAddedComment.focus();
    };

    let create_updateObj = ()=>{
        let updateObj = {};
            updateObj.name     = document.querySelector('.profileName').innerHTML;
            updateObj.role     = document.querySelector('.profileRole').innerHTML;
            updateObj.location = document.querySelector('.profileLocation').innerHTML;
            updateObj.number   = document.querySelector('.profileNumber').innerHTML;
            updateObj.bio      = document.querySelector('.bio_plate').innerHTML;
            updateObj.id       = window.localStorage.getItem('currUser');

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
            else if(thisField.classList.contains('profileRole')){
                unique = 'role';
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

    /* Hitting "Enter" in editable field
    - removes contenteditable
    - if empty, add placeholder text back
    - sends updateObj to DB
    - sets activeField to null */
    let updateField = async(e)=>{
        if(e.key == "Enter"){
            let thisField = e.target;
            thisField.removeAttribute('contenteditable');
            fieldEmpty_getPlaceholder(thisField);
            let updateObj = create_updateObj();
            await axios.put(`/user`, updateObj);
            activeField = null;
        };
    };

    let updateBy_clickOut = async(e)=>{
        let coords = [e.x, e.y];
        if(activeField != null
        && isWithin(coords, activeField) == false){
            updateField(e);
        };
    };

    let updateBy_enter = async(e)=>{
        if(e.key == "Enter"){
            updateField(e);
        };
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
                        <h1 className="profileName" onDoubleClick={editFieldInit} onKeyDown={updateField}>
                            {`${profileInfo.firstName} ${profileInfo.lastName}`}
                        </h1>
                        <p className="profileRole" onDoubleClick={editFieldInit} onKeyDown={updateField}>
                            {props.profileRole ? props.profileRole : "+ add a role"}
                        </p>
                        <div className="profileEmail">
                            {profileInfo.email}
                        </div>
                        <div className="profileLocation" onDoubleClick={editFieldInit} onKeyDown={updateField}>
                            {props.profileLocation ? props.profileLocation : "+ add a location"}
                        </div>
                        <div className="profileNumber" onDoubleClick={editFieldInit} onKeyDown={updateField}>
                            {props.profileNumber ? props.profileNumber : "+ add a number"}
                        </div>
                        <div className="links_wrap">

                        </div>
                    </div> {/* END react wrap */}
                </div> {/* END info_wrap */}
                <div className="bioAndComments_wrap">
                    <div className="bio_wrap">
                        <div className="bio_plate" onDoubleClick={editFieldInit} onKeyDown={updateField}>
                            {props.bio ? props.bio : "+ add a bio"}
                        </div>
                    </div>
                    <div className="addCommentButton" onClick={addComment}>+</div>
                    <div className="comments_wrap">
                        {/* <span className="comments_fade"></span> */}
                        <div className="comment_plate">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        <div className="comment_plate">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                        <div className="comment_plate">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;
