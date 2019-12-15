import React from 'react';

function ProfilePage(props) {
    let profileInfo = props.profileInfo;

    /* Double Click makes field editable and take focus */
    let editField = function(e){
        let thisField = e.target;
        thisField.setAttribute("contenteditable", "true");
        thisField.focus();
    };

    /*
    Hitting "Enter" in editable field
    removes contenteditable from editField
    sends a updateObj to DB
    */
    let updateField = function(e){
        if(e.key == "Enter"){

            e.target.removeAttribute('contenteditable');

            let updateObj = {};
                updateObj.name     = document.querySelector('.profileName').innerHTML;
                updateObj.role     = document.querySelector('.profileRole').innerHTML;
                updateObj.email    = document.querySelector('.profileEmail').innerHTML;
                updateObj.location = document.querySelector('.profileLocation').innerHTML;
                updateObj.number   = document.querySelector('.profileNumber').innerHTML;
                updateObj.bio      = document.querySelector('.bio_plate').innerHTML;

            console.log(updateObj, 'updateObj');
        };
    };

    // let check_containerEmpty = function(e){
    //     let linksWrap = document.querySelector('.links_wrap');
    //     let linksWrapChildren = linksWrap.children;
    //     console.log(linksWrapChildren, 'linkswrapchildren');
    // };

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
                        <h1 className="profileName" onDoubleClick={editField} onKeyDown={updateField}>{`${profileInfo.firstName} ${profileInfo.lastName}`}</h1>
                        <p className="profileRole"><i onDoubleClick={editField} onKeyDown={updateField}>Freelance Web Developer</i></p>
                        <div className="profileEmail" onDoubleClick={editField} onKeyDown={updateField}>{profileInfo.email}</div>
                        <div className="profileLocation" onDoubleClick={editField} onKeyDown={updateField}>{`${profileInfo.city} ${profileInfo.country}`}</div>
                        <div className="profileNumber" onDoubleClick={editField} onKeyDown={updateField}>(502)-106-2694</div>
                        <div className="links_wrap">

                        </div>
                    </div> {/* END react wrap */}
                </div> {/* END info_wrap */}
                <div className="bioAndComments_wrap">
                    <div className="bio_wrap">
                        <div className="bio_plate" onDoubleClick={editField} onKeyDown={updateField}>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </div>
                    </div>
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
