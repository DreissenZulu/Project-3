import React from 'react';

function SearchBar(props) {
  return (
    <form className="container" onSubmit={props.submitSearch}>
      <div className="form-group">
        <input className="form-control" name="search" onChange={props.handleSearch} type="search" placeholder="Search..." autoComplete="off" aria-label="Search" />
      </div>
      <button type="submit" style={{margin:"auto"}} className="btn btn-primary d-block">Search</button>
    </form>
  )
}

export default SearchBar;