import React from 'react';
import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="hero noselect">
            <div className="hero-inner fadeIn">
                <h1 className="text-light">Welcome to YuMi Jobs!</h1>
                <h3 className="text-light">The Job Board by Mi, for Yu</h3>
                <Link to="/home"><button className="btn btn-primary">Get Started!</button></Link>
            </div>
        </section>
    )
}

export default Hero;