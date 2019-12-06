import React, {useState} from 'react';
import SearchBar from "../components/SearchBar";

function Landing() {
    const [ search, setSearch ] = useState("")

    function handleSearch(event) {
        setSearch(event.target.value);
    }

    function submitSearch(event) {
        event.preventDefault();
        console.log(search);
    }

    return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Welcome to Infact!</h1>
                    <p className="lead">The job board for contract and temporary work for Freelancers</p>
                </div>
            </div>
            <SearchBar handleSearch={handleSearch} submitSearch={submitSearch}/>
        </div>
    )
}

export default Landing;