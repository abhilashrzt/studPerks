import React from 'react';
import classNames from 'classnames';
import styles from './AdminFileUploadComp.module.css';
import DropDown from '../DropDown/DropDown';


const AdminFileUploadComp = ({onChangeData, onSelectFile, onUploadBtnClick, data, disabled}) => {
    return(
        <>
            <div className={styles.headerText}>Upload File</div>
                <div className={styles.inputWrapper}>
                    <label className={styles.labelWrapper}>Subject Name : </label>
                    <input
                        className={styles.inputElement} 
                        type='text' 
                        required
                        value={data.subjectName}
                        onChange={(e)=>onChangeData({key: 'subjectName', value: e.target.value})} 
                        placeholder='Enter subject name'
                    />
                </div>
            <div className={styles.inputWrapper}>
                <label className={styles.labelWrapper}>File Name : </label><input
                className={styles.inputElement} 
                type='text' 
                disabled
                value={data.fileName.replace(/[^a-zA-Z ]/g, "")}
                placeholder='File name'
                />
                </div>
                <div className={styles.inputWrapper}>
                    <DropDown
                        data={data?.degree || []}
                        onChangeData={onChangeData}
                        name={"name"}
                        id={"id"} 
                        valueKey={"degree"}
                        data={["BCA", "BSc", "BA", "BCom", "BBA"]}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <label className={styles.labelWrapper}>File : </label> 
                    <input
                        className={styles.fileSelectElement}  
                        disabled={!data.degree} 
                        title={'Upload File'} 
                        type="file"
                        accept=".pdf, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                        onChange={onSelectFile} 
                    />
            </div>
            <div className={styles.inputWrapper}>
                <button 
                disabled={disabled} 
                className={classNames(styles.headerBtn, styles.uploadBtn, {[styles.disabled]: disabled})} 
                onClick={onUploadBtnClick}
                >Upload</button>
            </div>
        </>
    )
}

export default AdminFileUploadComp;