import React from 'react';
import classNames from 'classnames';
import styles from './Loader.module.css'


const Loader = ({classes}) => {
    return (
        <div className={classNames(styles.loader, classes?.loader)}/>
    )
}

export default Loader;