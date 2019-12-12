import React from 'react';
import { Link } from "react-router-dom";

function SearchResults(props) {
  if (props.results === "none") {
    return (
      <div>
        <h1><i class="fas fa-unlink"></i> Uh oh, we couldn't find anything for {(props.search.query === "" || props.search.location === "") ? `${props.search.query}${props.search.location}` : `${props.search.query} in ${props.search.location}` }</h1>
      </div>
    )
  }

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
}

export default SearchResults;