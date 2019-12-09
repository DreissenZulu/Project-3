import React from 'react';

function SearchResults(props) {
    return (
        <div className="container">
            {props.results.map(post => {
                return (
                    <div>
                        {post.title}
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults;