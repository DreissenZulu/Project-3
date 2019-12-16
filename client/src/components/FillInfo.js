import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FillInfo(props) {
    let userID = (localStorage.getItem("currUser") ? JSON.parse(localStorage.getItem("currUser")).id : 0);
    let jobInfo = props.jobInfo.listing;
    const [saved, setSaved] = useState( false )

    useEffect(() => {
        checkSaved();
    })

    async function checkSaved() {
        let result = await axios.get(`/api/jobs/${userID}/${Number(jobInfo.id)}`)
        if (result.data === "saved") {
            setSaved(true);
        }
    }

    function savejob(){
        if (userID === 0) {
            return
        }
        let sendObj = {}
        sendObj.userId = userID;
        sendObj.jobtitle = jobInfo.title;
        sendObj.jobid = jobInfo.id;
        let url = '/savejob';
        axios.post(url, sendObj);
    
        setSaved({ ...saved, saved: true});
        
    }


    if (jobInfo) {
        return (
            <div className="row d-flex">
                <div className="col-md-4 bg-light" id="jobSideBar">
                    <img src={"https://" + props.jobInfo.company.logo.split("https://")[2]} className="posting-img" alt="..." />
                    <h1>{jobInfo.title}</h1>
                    <h3>{jobInfo.category.name} at <a href={jobInfo.company.url} target="_blank" rel="noopener noreferrer" >{jobInfo.company.name}</a></h3>
                    <a className="btn btn-primary" href={props.jobInfo.apply_url}>Apply Here!</a>
                    <a className={saved ? "btn btn-secondary disabled" : "btn btn-primary text-light"} onClick={savejob} style={{marginLeft: '20px'}} disabled={saved} >{saved ? "Saved!" : "Add Job!"} </a>
                </div>
                <div className="col-md-8">
                    <div dangerouslySetInnerHTML={{ __html: jobInfo.description }} />
                    <p><strong>Keywords:</strong> {jobInfo.keywords ? jobInfo.keywords.replace(/[,]/g, ", ") : ""}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border mt-5" style={{width: "3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default FillInfo;