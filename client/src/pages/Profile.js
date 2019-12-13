import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../../public/css/profile.css';

function Profile() {
    const [profileInfo, setProfileInfo] = useState("")

    let profileID = window.localStorage.getItem('currUser');

    useEffect(() => {
        if (profileID !== undefined) {
            fetchUser(profileID)
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [profileInfo])

    async function fetchUser(profileID) {
        try {
            let profileData = await axios.get(`/api/user/${profileID}`)
            setProfileInfo(profileData.data[0]);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
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
                            <h1 class="test">{`${profileInfo.firstName} ${profileInfo.lastName}`}</h1>
                            <p><i>Freelance Web Developer</i></p>
                            <p className="profile-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consectetur dolor. Suspendisse imperdiet tellus non ligula pharetra condimentum. Curabitur quis lacinia justo, a malesuada mauris. Proin ut mauris turpis. Morbi vulputate sapien lectus, suscipit finibus ex vehicula eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum in semper tellus. Aliquam pellentesque eleifend nibh, at gravida velit pulvinar eget. Maecenas maximus vulputate eros, viverra sollicitudin est blandit sed. Nam vel magna tortor. Cras dictum ante nec ornare interdum. Maecenas at euismod est, a convallis sapien. </p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-4">
                                {`${profileInfo.email}`}
                            </div>
                            <div className="col-md-4">
                                Ontario, Canada
                            </div>
                            <div className="col-md-4">
                                (502)-106-2694
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Profile;