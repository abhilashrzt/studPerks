import React from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import styles from './Header.module.css'

const Header = ({showPopup, setShowPopup}) => {
    return (
        <header className={styles.headerWrapper}>
                <Link to={'/'}> <button className={styles.headerText}>Student Perks</button></Link> 
                <div className={styles.btnWrapper}>
                   <Link to={'/downloads'}><button className={classnames(styles.headerBtn, styles.downBtn)}>Downloads</button></Link> 
                   <Link to={'/admin'}><button className={classnames(styles.headerBtn, styles.logBtn)}>Login</button></Link> 
                   <button className={styles.contactUsBtn} onClick={()=>setShowPopup(!showPopup)}>Contact Us</button>
                </div>
        </header>
    )
}

export default Header;