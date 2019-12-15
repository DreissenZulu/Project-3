import React, { useState } from 'react';
import axios from 'axios';

function FillInfo(props) {

    const [saved, setSaved] = useState({
        saved: ""
    })




    let jobInfo = props.jobInfo.listing;

    function savejob(){
        let sendObj = {}
        console.log(jobInfo);
        sendObj.userId = localStorage.getItem("currUser");
        sendObj.jobtitle = jobInfo.title;
        sendObj.jobid = jobInfo.id;
        let url = '/savejob';
        axios.post(url, sendObj);
    
        setSaved({ ...saved, saved:"YES"});
        console.log(saved);
        
    }


    if (jobInfo) {
        return (
            <div className="row d-flex">
                <div className="col-md-4 bg-light" id="jobSideBar">
                    <img src={"https://" + props.jobInfo.company.logo.split("https://")[2]} className="posting-img" alt="..." />
                    <h1>{jobInfo.title}</h1>
                    <h3>{jobInfo.category.name} at <a href={jobInfo.company.url} target="_blank" rel="noopener noreferrer" >{jobInfo.company.name}</a></h3>
                    <a className="btn btn-primary" href={props.jobInfo.apply_url}>Apply Here!</a>
                    <a className="btn btn-primary" onClick={savejob} style={{marginLeft: '20px'}} >Add Job! </a>
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