import React from 'react';

function SetUp() {
    let currUser = JSON.parse(localStorage.getItem('currUser'));
    if ((currUser === null) || (currUser.role !== null)) {
        return (
            <div className="container text-center">
                <h1>Unauthorized Access</h1>
            </div>
        )
    }

    return (
        <div>

        </div>
    )
}

export default SetUp;