import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Footer from "./components/Footer";
import JobDetails from './pages/JobDetails';
import "./App.css";

function App() {
  return (
    <Router>
      <main>
        <NavBar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LogIn} />
        <Route path="/post/:id" component={JobDetails} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
