import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePage from '../components/ProfilePage';
// import InitializeUser from 'InitializeUser';

function Profile() {
    const [profileInfo, setProfileInfo] = useState("")
    let profileID = window.location.pathname.split("/")[2]
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