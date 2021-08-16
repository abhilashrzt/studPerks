import React, {useEffect, useState} from 'react';
import { firebaseDb } from '../../firebaseConfig';
import { useClipboard } from 'use-clipboard-copy';
import classNames from 'classnames';
import styles from './AdminFileUploadComp.module.css';
import DropDown from '../DropDown/DropDown';


const AdminFileUploadComp = ({onChangeData, onSelectFile, onUploadBtnClick, data, disabled}) => {
    const [feedBackData, setFeedBackData] = useState([]);
    const [feedBack, setFeedBack] = useState({});
    const clipboard = useClipboard();

     useEffect(() => {
       firebaseDb.ref().child(`feedback/`).on('value', (snapshot)=>{
            const data = snapshot.val();
            setFeedBackData(data ? Object.values(data) : []);
       });
    }, [])

    const onClickDelete = (email) => {
            firebaseDb.ref().child(`feedback/${email}`).remove(err=>{
                if(err){
                    console.log("Error in FBD : ", err);
                }
            })
    }

    return(
        <>
                {(feedBack.name) && 
                    <div className={styles.popupWrapper}>
                        <div className={classNames(styles.headerText, styles.feedbackHeader)}>Feedback</div>
                        <button className={styles.closeBtn} onClick={()=>setFeedBack({})}>X</button>
                        <div className={styles.feedbackLabelWrapper}><label className={styles.labelWrapper}>Name : </label>{`  ${feedBack.name}`}</div>
                        <div className={styles.feedbackLabelWrapper}><label className={styles.labelWrapper}>Email : </label>{`  ${feedBack.email}`}</div>
                        <div className={styles.feedbackLabelWrapper}><label className={styles.labelWrapper}>Link : </label>
                        <input className={styles.feedbackLinkInput} ref={clipboard.target} value={feedBack.link} readOnly />
                        <button className={classNames(styles.editBtn, styles.cpybtn)} onClick={clipboard.copy}>Copy</button>
                        </div>
                        <div className={styles.feedbackLabelWrapper}><label className={styles.labelWrapper}>Feedback : </label>
                        <div className={styles.feedBackDivWrapper}>{`  ${feedBack.feedback}`}</div>
                        </div>
                    </div>}
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
                value={data.fileName}
                placeholder='File name'
                />
                </div>
                <div className={styles.inputWrapper}>
                    <DropDown
                        value={data?.degree || []}
                        onChangeData={onChangeData}
                        name={"Degree"}
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
                        accept=".pdf, .doc, .txt, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
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
            <div className={styles.feedbackWrapper}>
                <div className={styles.headerText}>Feedback</div>
                <div className={styles.tableWrapper}>
                <table>
                <thead>
                    <tr>
                        <th>Sl no.</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                    <tbody>
                        {feedBackData.map((item, index)=><tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td className={styles.tdWrapper}> 
                                <button className={styles.editBtn} onClick={()=>setFeedBack(item)}>View</button>
                                <button className={styles.deleteBtn} onClick={()=>onClickDelete(item?.email?.replace(/[^\w\s]/gi, ''))}>Delete</button>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
}

export default AdminFileUploadComp;