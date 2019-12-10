import React from 'react';

function FillInfo(props) {
    let jobInfo = props.jobInfo.listing
    if (jobInfo) {
        return (
            <div className="row d-flex">
                <div className="col-md-4 bg-secondary" id="jobSideBar">
                    <h1>{jobInfo.title}</h1>
                    <h3>{jobInfo.category.name} at <a href={jobInfo.company.url} target="_blank">{jobInfo.company.name}</a></h3>
                    <img src={"https://" + jobInfo.company.logo.split("https://")[2]} className="card-img" alt="..." />
                    <h3><a href={props.jobInfo.apply_url}>Apply Here!</a></h3>
                </div>
                <div className="col-md-8">
                    <div dangerouslySetInnerHTML={{ __html: jobInfo.description }} />
                    <p><strong>Keywords:</strong> {jobInfo.keywords ? jobInfo.keywords.replace(/[\,]/g, ", ") : ""}</p>
                </div>
            </div>
        )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}

export default FillInfo;