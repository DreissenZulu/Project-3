import React from 'react';

function ProfilePage(props) {
    let profileInfo = props.profileInfo;
    return (
        <div className="container">
                <div className="row d-flex">
                    <div className="col-md-4 bg-info text-light" >
                        <div style={{ textAlign: "center" }}>
                            <img className="rounded-pf-image" src="https://randomuser.me/api/portraits/men/87.jpg" alt="random user" />
                            <h3>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                            </h3>
                        </div>
                        <div>
                            <h1>{`${profileInfo.firstName} ${profileInfo.lastName}`}</h1>
                            <p><i>Freelance Web Developer</i></p>
                            <p className="profile-bio">{profileInfo.bio}</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-4">
                            {profileInfo.email}
                            </div>
                            <div className="col-md-4">
                            {`${profileInfo.city} ${profileInfo.country}`}
                            </div>
                            <div className="col-md-4">
                                (502)-106-2694
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default ProfilePage;