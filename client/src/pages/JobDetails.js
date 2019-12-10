import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FillInfo from '../components/FillInfo';


function JobDetails() {
    const [jobInfo, setJobInfo] = useState("")

    useEffect(() => {
        fetchJob()
    }, [])

    useEffect(() => {
        fetchJob()
    }, [jobInfo])

    async function fetchJob() {
        if (jobInfo === "") {
            try {
                let jobData = await axios.get(`/api${window.location.pathname}`)
                setJobInfo(jobData.data);
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="container">
            <FillInfo jobInfo={jobInfo}/>
        </div>
    )
}

export default JobDetails;