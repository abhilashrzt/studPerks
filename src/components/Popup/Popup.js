import React from 'react';
import styles from './Popup.module.css';
import classNames from 'classnames';

const Popup = ({onChangeData, data, submitFeedback, showStatus, hidePopup}) => {
    const disabled = !(data.email && data.name && data.feedback);
    return (
        <div className={styles.popupWrapper}>
                <div className={styles.popupContainer}>
                <div className={styles.feedbackStatusWrapper}>
                {showStatus && <div className={styles.feedbackStatus}>Feedback Submitted..</div>}</div>
                    <div className={styles.headerText}>Contact Us</div>
                    <div className={styles.inputWrapper}>
                        <label className={styles.labelWrapper}>Name : </label>
                        <input
                            className={styles.inputElement} 
                            type='text' 
                            required
                            value={data.name}
                            onChange={(e)=>onChangeData({key: 'name', value: e.target.value})} 
                            placeholder='Enter your name'
                        />
                </div>
                <div className={styles.inputWrapper}>
                        <label className={styles.labelWrapper}>Email : </label>
                        <input
                            className={styles.inputElement} 
                            type='email' 
                            required
                            value={data.email}
                            onChange={(e)=>onChangeData({key: 'email', value: e.target.value})} 
                            placeholder='Enter your email'
                        />
                </div>
                <div className={styles.inputWrapper}>
                        <label className={styles.labelWrapper}>Link : </label>
                        <input
                            className={styles.inputElement} 
                            type='text' 
                            required
                            value={data.link}
                            onChange={(e)=>onChangeData({key: 'link', value: e.target.value})} 
                            placeholder='Paste your new document link here'
                        />
                </div>
                <div className={styles.inputWrapper}>
                        <label className={classNames(styles.labelWrapper)}>Feedback : </label>
                        <textarea
                            className={classNames(styles.inputElement, styles.textarea)} 
                            type='textarea' 
                            required
                            value={data.feedback}
                            onChange={(e)=>onChangeData({key: 'feedback', value: e.target.value})} 
                            placeholder='Enter  feedback'
                        />
                </div>
                <div className={styles.btnWrapper}>
                    <button className={classNames(styles.headerBtn, styles.downBtn)} disabled={disabled} onClick={submitFeedback}>Submit</button>
                    <button className={classNames(styles.headerBtn, styles.logBtn)} onClick={()=>hidePopup()}>Cancel</button>
                </div>
                </div>
        </div>
    )
}

export default Popup;