import React from 'react';

function FillInfo(props) {
    let jobInfo = props.jobInfo.listing;

    if (jobInfo) {
        return (
            <div className="row d-flex">
                <div className="col-md-4 bg-light" id="jobSideBar">
                    <img src={"https://" + props.jobInfo.company.logo.split("https://")[2]} className="posting-img" alt="..." />
                    <h1>{jobInfo.title}</h1>
                    <h3>{jobInfo.category.name} at <a href={jobInfo.company.url} target="_blank" rel="noopener noreferrer" >{jobInfo.company.name}</a></h3>
                    <a className="btn btn-primary" href={props.jobInfo.apply_url}>Apply Here!</a>
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