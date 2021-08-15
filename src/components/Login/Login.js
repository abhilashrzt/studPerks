import React, { useState, useEffect } from 'react';
import User from '../User/User';
import styles from './Login.module.css'

const Login = ({page}) => {
    return (
        <div className={styles.bodyWrapper}>
            <User/>
        </div>
    )
}

export default Login;