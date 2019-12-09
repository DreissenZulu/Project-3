import React, {useState} from 'react';
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import axios from 'axios';

function Landing() {
    const [ search, setSearch ] = useState("")
    // const [ results, setResults ] = useState()

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    async function submitSearch(event) {
        event.preventDefault();
        try {
            let searchResults = await axios.get(`/search/${search}`)
            console.log(searchResults)
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
            <SearchBar handleSearch={handleSearch} submitSearch={submitSearch}/>
            {/* <SearchResults /> */}
        </div>
    )
}

export default Landing;