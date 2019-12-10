import React, { useState } from 'react';
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import axios from 'axios';

function Landing() {
    const [search, setSearch] = useState({
        query: "",
        location: ""
    })
    const [results, setResults] = useState([])

    function handleSearch(event) {
        if (event.target.name === "search") {
            setSearch({...search, query: event.target.value});
        } else if (event.target.name === "location") {
            setSearch({...search, location: event.target.value});
        }
    }

    async function submitSearch(event) {
        event.preventDefault();
        try {
            let searchResults = await axios.get(`/search/${search.query}`)
            setResults(searchResults.data);
        } catch (err) {
            console.log(err)
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
            <SearchBar handleSearch={handleSearch} submitSearch={submitSearch} />
            <div className="container">
                <SearchResults results={results} />
            </div>
        </div>
    )
}

export default Landing;