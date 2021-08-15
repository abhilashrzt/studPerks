import React from 'react';
import classnames from 'classnames';
import styles from './HomePage.module.css'

const HomePage = () => {
    return (
        <div className={styles.bodyWrapper}>
                <div className={styles.bgImg}/>
                <div className={styles.textContainer}>
                    <div className={styles.aboutWrapper}>
                        <span className={styles.secondaryHeaderText}>About</span>
                        <span className={styles.aboutText}>This is a project where students can download study materials.</span>
                    </div>
                </div>
            </div>
    )
}

export default HomePage;