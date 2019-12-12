import React from 'react';

function SearchBar(props) {
  function searchForm() {
    if (props.searchType === "jobs") {
      return (
        <form className="container" onSubmit={props.submitSearch}>
          <div className="row">
            <div className="form-group col-md-6">
              <input className="form-control" name="search" onChange={props.handleSearch} type="search" placeholder="Search for a job title (eg. Developer)" autoComplete="off" aria-label="Search" />
            </div>
            <div className="form-group col-md-6">
              <input className="form-control" name="location" onChange={props.handleSearch} type="search" placeholder="Optional: add a location (eg. New York)" autoComplete="off" aria-label="Location" />
            </div>
          </div>

          <button type="submit" style={{ margin: "auto" }} className="btn btn-primary d-block">Search</button>
        </form>
      )
    } else {
      return (
        <form className="container" onSubmit={props.submitSearch}>
          <div className="row">
            <div className="form-group col-md-6">
              <input className="form-control" name="search" onChange={props.handleSearch} type="search" placeholder="Search for a user or a role" autoComplete="off" aria-label="Search" />
            </div>
            <div className="form-group col-md-6">
              <input className="form-control" name="location" onChange={props.handleSearch} type="search" placeholder="Optional: add a location (eg. New York)" autoComplete="off" aria-label="Location" />
            </div>
          </div>

          <button type="submit" style={{ margin: "auto" }} className="btn btn-primary d-block">Search</button>
        </form>
      )
    }
  }

  return (
    searchForm()
  )
}

export default SearchBar;