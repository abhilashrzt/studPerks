import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage, firebaseDb } from '../../firebaseConfig';
import AdminFileUploadComp from '../AdminFileUploadComp/AdminFileUploadComp';
import AdminDataTableComp from '../AdminDataTableComp/AdminDataTableComp';
import styles from './User.module.css'

const User = ({page}) => {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState({});
    const [fileChanged, setFileChanged] = useState(false);
    const [link, setLink] = useState('');
    const [uploading, setUploading] = useState(false);
    const [data, setData] = useState({
        fileName:"",
        degree:"BCA",
        url: "",
        subjectName: "",
        timeStamp: 0,
        uniqueKey: "",
        downloads: 0,
    })

    const onSelectFile = (e) => {
        const fileData = e.target.files[0];
        if(fileData){
            setLink('');
            setProgress(0);
            setFile(e.target.files[0]);
            setFileChanged(true);
            setData({
                ...data, 
                fileName: fileData.name, 
                downloads: 0,
                uniqueKey: uuidv4(),
            });
        }
    }

    const onUploadBtnClick = () =>{
        if(fileChanged){
            setUploading(true);
            const uploadTask = storage.ref(`files/${data?.degree}/${data.uniqueKey}/`).put(file);
            uploadTask.on(
              "state_changed",
              snapshot => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("files")
                  .child(`${data?.degree}/${data.uniqueKey}/`)
                  .getDownloadURL()
                  .then(url => {
                    console.log("Uploaded URL :",url)
                     onSaveClick(url);
                     setUploading(false);
                     setFileChanged(false);
                  });
              }
            );
        }
        else{
            onSaveClick();
        }
    }

    const onSaveClick = (url)=>{
        const timeStamp = data?.timeStamp > 0 ? data?.timeStamp : Date.now();
        const locationUrl = `${data?.degree}/${data.uniqueKey}/`;
        const dataObject = url ? {...data, url, timeStamp} : data;
        firebaseDb.ref().child(locationUrl).set(dataObject, err=>{
            if(err){
                console.log("fireDb err:", err)
                window.alert(err?.message)
            }
        });
    }


    const onChangeData = ({key, value}) =>{
        setData({
            ...data, 
            [key]: value, });
    }

    const disabled = !(data.subjectName && data.fileName);

    return (
        <>
            {uploading && <div className={styles.uploadPopup}>{`Uploading file ${progress}%`}</div>}
            <div className={styles.leftWrapper}>
                <AdminFileUploadComp
                    onChangeData={onChangeData}
                    onUploadBtnClick={onUploadBtnClick}
                    data={data}
                    disabled={disabled}
                    onSelectFile={onSelectFile}
                />
            </div>
            <div className={styles.rightWrapper}>
                <AdminDataTableComp
                    key={page}
                    isAdmin={true}
                    setData={setData}
                />
            </div>
        </>
    )
}

export default User;