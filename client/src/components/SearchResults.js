import React from 'react';
import { Link } from "react-router-dom";
import userPlaceholder from "../assets/Portrait_Placeholder.png";

function SearchResults(props) {
  if (props.results === "none") {
    return (
      <div>
        <h1><i class="fas fa-unlink"></i> Uh oh, we couldn't find anything for {(props.search.query === "" || props.search.location === "") ? `${props.search.query}${props.search.location}` : `${props.search.query} in ${props.search.location}`}</h1>
      </div>
    )
  } else if (props.search.type === "jobs") {
    return (
      <div className="row">
        {props.results.map(post => {
          let time = post.post_date.split(" ")[1]
          return (
            <div className="col-md-6 card">
              <div className="row no-gutters">
                <div className="col-md-4">
                  {/*The url needs to be split here since they smooshed two urls together*/}
                  <img src={"https://" + post.company.logo.split("https://")[2]} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <Link className="card-title" to={"/post/" + post.id}>
                      <h5>{post.title}</h5>
                    </Link>
                    <p>{post.company.name}</p>
                    <small className="text-muted">Posted {post.post_date.split(" ")[0]} {Number(time.split(":")[0]) > 12 ? ((Number(time.split(":")[0]) - 12) + ":" + time.split(":")[1] + " PM").padStart(8, '0') : time.slice(0, 5) + " AM"}</small>
                    <p>
                      {post.category.name} - {post.type.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  } else if (props.search.type === "people") {
    return (
      <div className="row">
        {props.results.map(user => {
          return (
            <div className="col-md-6 card">
              <div className="row no-gutters">
                <div className="col-md-3">
                  <img src={user.image_url ? user.image_url : userPlaceholder} className="card-img" alt="User image" />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <Link className="card-title" to={"/profile/" + user.id}>
                      <h5>{`${user.firstName} ${user.lastName}`}</h5>
                    </Link>
                    <p>{`${user.city}, ${user.country}`}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SearchResults;