import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePage from '../components/ProfilePage';

function Profile() {
    let profileID = window.location.pathname.split("/")[2]
    let currUser = JSON.parse(localStorage.getItem('currUser'));
    // Redirects the user to set up their profile if they have no assigned role yet
    if (currUser !== null) {
        if ((profileID == currUser.id) && (currUser.role === null)) {
            window.location.pathname = "/setup";
        }
    }

    const [profileInfo, setProfileInfo] = useState("")
    // let profileID = window.localStorage.getItem('currUser');

    useEffect(() => {
        if (profileID !== undefined) {
            fetchUser()
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [profileInfo])

    async function fetchUser() {
        if (profileInfo === "") {
            try {
                let profileData = await axios.get(`/api/user/${profileID}`)
                setProfileInfo(profileData.data[0]);
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <ProfilePage profileInfo={profileInfo}/>
    )

}

export default Profile;