import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePage from '../components/ProfilePage';
import '../css/profile.css';
// import InitializeUser from 'InitializeUser';

function Profile() {
    const [profileInfo, setProfileInfo] = useState("")
    let profileID = window.location.pathname.split("/")[2]

    useEffect(() => {
        if (profileID !== undefined) {
            fetchUser(profileID)
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