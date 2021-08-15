import React, { useState } from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Downloads from '../Downloads/Downloads';
import Login from '../Login/Login';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <Switch>
                <Route path={'/'} exact component={HomePage}/>
                <Route path={'/downloads'} component={Downloads}/>
                <Route path={'/admin'} component={Login}/>
            </Switch>
        </div>
    )
}

export default LandingPage;