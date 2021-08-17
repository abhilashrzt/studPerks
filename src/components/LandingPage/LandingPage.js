import React, { useEffect, useState } from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { firebaseDb } from '../../firebaseConfig';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Downloads from '../Downloads/Downloads';
import Popup from '../Popup/Popup';
import Login from '../Login/Login';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [data, setData] = useState({
        name: "",
        feedback: "",
        email: "",
        link: "",
    });

    const onChangeData = ({key, value}) =>{
        setData({...data, [key]: value})
    }

    const hidePopup = ()=> {
        setShowPopup(false);
        setShowStatus(false);
        setData({
            name: "",
            feedback: "",
            email: "",
            link: "",
        })
    }

    const submitFeedback = () => {
        firebaseDb.ref().child(`feedback/${data.email.replace(/[^\w\s]/gi, '')}`)
        .set(data, err=>{
            if(err){
                console.log("fireDb err:", err);
            }
        });
        setShowStatus(true);
        setTimeout(()=>{
            hidePopup(); 

        },1000);
    }

    return (
        <div className={styles.wrapper}>
            <Header
                setShowPopup={setShowPopup}
                showPopup={showPopup}
                isLoggedIn={isLoggedIn} 
                setIsLoggedIn={setIsLoggedIn}
            />
            {showPopup && <Popup
                onChangeData={onChangeData}
                data={data}
                setShowStatus={setShowStatus}
                showStatus={showStatus}
                setShowPopup={setShowPopup}
                submitFeedback={submitFeedback}
                hidePopup={hidePopup}
            />}
            <Switch>
                <Route path={'/'} exact component={()=><HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
                <Route path={'/downloads'} component={()=><Downloads/>}/>
                <Route path={'/admin'} component={()=><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            </Switch>
        </div>
    )
}

export default LandingPage;