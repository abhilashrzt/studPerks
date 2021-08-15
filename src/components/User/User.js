import React, { useState, useEffect } from 'react';
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
        downloads: 0,
    })

    const onSelectFile = (e) => {
        const fileData = e.target.files[0];
        if(fileData){
            setLink('');
            setProgress(0);
            setFile(e.target.files[0]);
            setFileChanged(true);
            setData({...data, fileName: fileData.name.replace(/[^a-zA-Z ]/g, "")})
        }
    }

    const onUploadBtnClick = () =>{
        if(fileChanged){
            setUploading(true);
            const uploadTask = storage.ref(`files/${data?.degree}/${data?.fileName.replace(/[^a-zA-Z ]/g, "")}/`).put(file);
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
                  .child(`${data?.degree}/${data?.fileName.replace(/[^a-zA-Z ]/g, "")}/`)
                  .getDownloadURL()
                  .then(url => {
                    console.log("Uploaded URL :",url)
                     onSaveClick(url);
                     setUploading(false);
                  });
              }
            );
        }
        else{
            onSaveClick();
        }
    }

    const onSaveClick = (url)=>{
        const locationUrl = `${data?.degree}/${data?.fileName.replace(/[^a-zA-Z ]/g, "")}/`;
        const dataObject = url ? {...data, url, timeStamp: Date.now()} : data;
        firebaseDb.ref().child(locationUrl) .set(dataObject, err=>{
            if(err){
                console.log("fireDb err:", err)
                window.alert(err?.message)
            }
        });
    }


    const onChangeData = ({key, value}) =>{
        setData({...data, [key]: value})
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