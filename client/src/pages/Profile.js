import React from 'react';

function Profile() {
    return (
        <div>
            <div className="container">
                <div className="row d-flex">
                    <div className="col-md-4 bg-info text-light" >
                        <div style={{ textAlign: "center" }}>
                            <img className="rounded-pf-image" src="https://randomuser.me/api/portraits/men/87.jpg" alt="random user" />
                            <h3>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                            </h3>
                        </div>
                        <div>
                            <h1>Phillip Lynch</h1>
                            <p>Freelance Web Developer</p>
                            <p className="profile-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consectetur dolor. Suspendisse imperdiet tellus non ligula pharetra condimentum. Curabitur quis lacinia justo, a malesuada mauris. Proin ut mauris turpis. Morbi vulputate sapien lectus, suscipit finibus ex vehicula eget. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum in semper tellus. Aliquam pellentesque eleifend nibh, at gravida velit pulvinar eget. Maecenas maximus vulputate eros, viverra sollicitudin est blandit sed. Nam vel magna tortor. Cras dictum ante nec ornare interdum. Maecenas at euismod est, a convallis sapien. </p>
                        </div>
                    </div>
                    <div className="col-md-8">

                    </div>
                </div>

            </div>
        </div>
    )

}

export default Profile;