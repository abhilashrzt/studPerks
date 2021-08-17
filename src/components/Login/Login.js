import React, { useState, useEffect } from 'react';
import User from '../User/User';
import classNames from 'classnames';
import { firebaseDb } from '../../firebaseConfig';
import styles from './Login.module.css'

const Login = ({setIsLoggedIn, isLoggedIn}) => {
    const [credentials, setCredentials] = useState({
        password: '',
        userName: '',
    });
    const [invalid, setInvalid] = useState(false);

    const validateCredentials = () => {
        firebaseDb.ref().child(`cred/${credentials.userName || null}`).on("value", (snapshot) => {
            const value = snapshot.val();
            if(value != credentials.password) 
            {
                setInvalid(true);
            } else{
                setInvalid(false);
                document.cookie = `authTokenStudentGuide=${value}`;
                setIsLoggedIn(true);
            } 
        });
    }

    return (
        <div className={styles.bodyWrapper}>
            {isLoggedIn ? <User/> : 
            <div className={styles.logInWrapper}>
                <div className={styles.logInPopupWrapper}>
                <div className={styles.headerText}>Login</div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.labelWrapper}>User Name : </label>
                        <input
                            className={styles.inputElement} 
                            type='text' 
                            required
                            value={credentials.userName}
                            onChange={(e)=>setCredentials({...credentials, userName: e.target.value})} 
                            placeholder='Enter Username'
                        />
                    </div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.labelWrapper}>Password : </label>
                        <input
                            className={styles.inputElement} 
                            type='password' 
                            required
                            value={credentials.password}
                            onChange={(e)=>setCredentials({...credentials, password: e.target.value})} 
                            placeholder='Enter password'
                        />
                </div>
                <button className={classNames(styles.headerBtn, styles.logBtn)} onClick={()=>validateCredentials()}>Login</button>
                {invalid && <span className={styles.errorText}>Invalid credentials!!</span>}
                </div>
            </div>}
        </div>
    )
}

export default Login;