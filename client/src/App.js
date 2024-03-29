import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import JobDetails from './pages/JobDetails';
import Hero from './pages/Hero';
import SetUp from './pages/SetUp';
import Layout from './components/Layout';
import "./App.css";

function App() {
  return (
    <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Hero} />
            <Route exact path="/home" component={Landing} />
            <Route path="/profile/:id" component={Profile} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/setup" component={SetUp} />
            <Route path="/post/:id" component={JobDetails} />
          </Switch>
        </Layout>
    </Router>
  );
}

export default App;
