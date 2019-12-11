import React from 'react';
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero noselect">
            <div className="hero-inner">
                <h1 className="text-light">Welcome to Working Title!</h1>
                <h3 className="text-light">The Job Board by Freelancers, for Freelancers</h3>
                <Link to="/home"><button className="btn btn-primary">Get Started!</button></Link>
            </div>
        </section>
    )
}

export default Hero;