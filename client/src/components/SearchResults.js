import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import userPlaceholder from "../assets/Portrait_Placeholder.png";

function SearchResults(props) {

  let userID = (localStorage.getItem("currUser") ? JSON.parse(localStorage.getItem("currUser")).id : 0);

  const [added, setAdded] = useState( "init" )

  useEffect(() => {
    checkAdded();
})

useEffect(() => {
  checkAdded();
}, [added])

async function checkAdded(){
  if (added === "init") {
  let result = await axios.get(`/api/people/${userID}`)
            setAdded(result.data.map(idObj => idObj.connected_id));
  }
}



  function addUser(event){
    if (userID === 0) {
      return
    }
        let sendObj = {}
        sendObj.userId = JSON.parse(localStorage.getItem("currUser")).id;
        sendObj.addedUser = Number(event.target.value);
        let url = '/adduser';
        axios.post(url, sendObj);

  }



  if (props.results === "none") {
    return (
      <div>
        <h1><i class="fas fa-unlink"></i> Uh oh, we couldn't find anything for {(props.search.query === "" || props.search.location === "") ? `${props.search.query}${props.search.location}` : `${props.search.query} in ${props.search.location}`}</h1>
      </div>
    )
  } else if (props.search.type === "jobs" && Array.isArray(props.results)) {
    return (
      <div className="row">
        {props.results.map(post => {
          let time = post.post_date.split(" ")[1]
          return (
            <div className="col-md-12 card">
              <div className="row no-gutters">
                <div className="col-xs-2">
                  {/*The url needs to be split here since they smooshed two urls together*/}
                  <img style={{maxHeight: "128px", maxWidth: "128px"}} src={"https://" + post.company.logo.split("https://")[2]} className="card-img" alt="..." />
                </div>
                <div className="col-xs-10">
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
            <div className="col-lg-6 card">
              <div className="row no-gutters">
                <div className="col-xs-2">
                  <img style={{maxHeight: "128px", maxWidth: "128px"}} src={user.image_url ? user.image_url : userPlaceholder} className="card-img" alt="User image" />
                </div>
                <div className="col-xs-9" style={{marginRight: "auto"}}>
                  <div className="card-body">
                    <Link className="card-title" to={"/profile/" + user.id}>
                      <h5>{`${user.firstName} ${user.lastName}`}</h5>
                    </Link>
                    <p>{`${user.city}, ${user.country}`}</p>
                  </div>
                </div>
                <div className="col-xs-1">
                  <button className={added.includes(user.id) || userID === 0 ? "btn btn-secondary disabled" : "btn btn-primary"} disabled={added.includes(user.id)} value = {user.id} onClick={addUser} style={{marginTop: "10px", marginRight: "10px"}}><i class="fas fa-plus" aria-disabled="false"></i></button>
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