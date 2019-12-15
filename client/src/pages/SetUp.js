import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SetUp() {
    let currUser = JSON.parse(localStorage.getItem('currUser'));
    const [profileInfo, setProfileInfo] = useState("")
    const [formData, setFormData] = useState({
        id: currUser.id !== undefined ? currUser.id : "",
        role: "",
        city: "",
        country: "",
        imageURL: "",
        bio: ""
    })

    useEffect(() => {
        if (currUser !== null) {
            fetchUser()
        }
    }, [])

    useEffect(() => {
        fetchUser()
    }, [profileInfo])

    if ((currUser === null) || (profileInfo.role !== null)) {
        return (
            <div className="container text-center">
                <h1>Unauthorized Access</h1>
            </div>
        )
    }

    async function fetchUser() {
        if (profileInfo === "") {
            try {
                let profileData = await axios.get(`/api/user/${currUser.id}`)
                setProfileInfo(profileData.data[0]);
            } catch (err) {
                console.log(err)
            }
        }
    }

    function handleInput(event) {
        if (event.target.name === "city") {
            setFormData({ ...formData, city: event.target.value });
        } else if (event.target.name === "country") {
            setFormData({ ...formData, country: event.target.value });
        }
    }

    function setUserRole(event) {
        setFormData({ ...formData, role: event.target.value })
    }

    function finishSetUp(event) {
        event.preventDefault()
        axios.put("/setup", formData).then(() => {
            window.localStorage.setItem('currUser', JSON.stringify({ id: currUser.id, role: formData.role }));
            window.location.pathname = `/profile/${currUser.id}`
        }) 
    }

    return (
        <div>
            <div className="container text-center position-relative slideDown">
                <h1>Hi {profileInfo.firstName}!</h1>
                <h2>Looks like you're new around here! Let's get you started.</h2>
                <div className="row">
                    <div className="col-6">
                        <button className={formData.role === "freelancer" ? "btn btn-primary" : "btn btn-secondary"} onClick={setUserRole} value="freelancer">I am a freelancer</button>
                    </div>
                    <div className="col-6">
                        <button className={formData.role === "employer" ? "btn btn-primary" : "btn btn-secondary"}  onClick={setUserRole} value="employer">I am an employer</button>
                    </div>
                </div>
                <form onSubmit={finishSetUp} className={formData.role === "" ? "d-none" : "fadeIn text-left"}>
                    <div className="form-group">
                        <label htmlFor="cityInput">Required: City</label>
                        <input className="form-control" onChange={handleInput} name="city" id="cityInput" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="countryInput">Required: Country</label>
                        <input className="form-control" onChange={handleInput} name="country" id="countryInput" />
                    </div>
                    <button type="submit" className={(formData.city.trim() === "" || formData.country.trim() === "") ? "btn btn-primary disabled" : "btn btn-primary"} disabled={formData.city.trim() === "" || formData.country.trim() === ""} >Finish</button>
                </form>
            </div>
        </div>
    )
}

export default SetUp;