import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import axios from 'axios';

function Landing() {
    const [search, setSearch] = useState({
        query: "",
        location: "",
        type: "jobs"
    })
    const [results, setResults] = useState([])

    function handleSearch(event) {
        if (results === "none") {
            setResults([])
        }
        if (event.target.name === "search") {
            setSearch({ ...search, query: event.target.value });
        } else if (event.target.name === "location") {
            setSearch({ ...search, location: event.target.value });
        }
    }

    function handleType(event) {
        setSearch({ ...search, type: event.target.value });
    }

    async function submitSearch(event) {
        event.preventDefault();
        if (search.type === "jobs") {
            try {
                let searchResults = await axios.get(`/search/${search.query}`)
                if (searchResults.data.length === 0) {
                    setResults("none");
                } else {
                    setResults(searchResults.data);
                }
            } catch (err) {
                console.log(err)
            }
        } else if (search.type === "people") {
            try {
                let searchResults = await axios.get(`/api/users/`, {params: {query: search.query, location: search.location}})
                if (searchResults.data.length === 0) {
                    setResults("none");
                } else {
                    setResults(searchResults.data);
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Welcome to Working Title!</h1>
                    <p className="lead">The job board for connecting Freelancers</p>
                </div>
            </div>

            <div className="container">
                <h2>I'm looking for...</h2>
                <div className="row">
                    <div className="col-lg-6">
                        <button className={search.type === "jobs" ? "btn search-type-btn text-light job-btn-select" : "btn search-type-btn text-light job-btn-deselect"} onClick={handleType} value="jobs">Jobs</button>
                    </div>
                    <div className="col-lg-6">
                        <button className={search.type === "people" ? "btn search-type-btn text-light people-btn-select" : "btn search-type-btn text-light people-btn-deselect"} onClick={handleType} value="people">People</button>
                    </div>
                </div>
            </div>

            <SearchBar searchType={search.type} handleSearch={handleSearch} submitSearch={submitSearch} />
            <div className="container">
                <SearchResults search={search} results={results} />
            </div>
        </div>
    )
}

export default Landing;