import React from 'react';
import AdminDataTableComp from '../AdminDataTableComp/AdminDataTableComp';
import styles from './Downloads.module.css'

const Downloads = () => {
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.rightWrapper}>
                <AdminDataTableComp/>
            </div>
        </div>
    )
}

export default Downloads;