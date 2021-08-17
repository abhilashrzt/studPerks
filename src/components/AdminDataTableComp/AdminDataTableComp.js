import React, {useEffect, useState} from 'react';
import { storage, firebaseDb } from '../../firebaseConfig';
import Loader from '../Loader/Loader';
import DropDown from '../DropDown/DropDown';
import classNames from 'classnames';
import styles from './AdminDataTableComp.module.css';


const AdminDataTableComp = ({ isAdmin, setData }) => {
    const degrees = ["BCA", "BSc", "BA", "BCom", "BBA", "Question Papers", "Others"];
    const databaseTypes = ["Realtime Database","Storage"];
    const [isLoading, setIsloading] = useState(false);
    const [selectedDegree, setSelectedDegree] = useState(degrees[0]);
    const [selectedDB, setSelectedDB] = useState(databaseTypes[0]);
    const [tableData, setTableData] = useState([]);
    const [subject, setSubject] = useState(["All"]);
    const [selectedSubject, setSelectedSubject] = useState(subject[0]);
    const [searchText, setSearchText] = useState("");
    const [storageData, setStorageData] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(()=>{
        getData();
    },[selectedDegree])

    useEffect(() => {
        const fetchFiles = async () => {
        setIsloading(true);
        let result = await storage.ref().child(`files/${selectedDegree}`).listAll();
            let urlPromises = result.items.map(fileRef => fileRef.getMetadata());
            return Promise.all(urlPromises);
    
        }
        const  loadFiles = async () => {
            const urls = await fetchFiles();
            const uniqueIDs = tableData.map((item)=>item.uniqueKey);
            setStorageData(urls.map(file=>{
                 const includes = uniqueIDs.includes(file.name);
                 return includes ? {...file, isLinked: true} : file;
            }));
            setIsloading(false);
            setIsDeleting(false);

        }
        loadFiles();
        }, [selectedDB, selectedDegree, isDeleting]);


    const getData = () => {
        setSelectedSubject(subject[0]);
        setIsloading(true);
       firebaseDb.ref().child(`${selectedDegree}/`).on('value', (snapshot)=>{
            const data = snapshot.val();
            const arrayData = Object.values(data || [])
            const subjects = arrayData.map((item)=>item.subjectName);
            subjects.unshift("All");
            setTableData(arrayData);
            setSubject([...new Set(subjects)]);
            setIsloading(false);
       });
    }

    const onChangeDegree = (data) =>{
        setSelectedDegree(data.value);
    }

    const onChangeDB = (data) =>{
        setSelectedDB(data.value)
    }

    const onChangeSubject = (data) =>{
        setSelectedSubject(data.value)
    }

    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    const onClickDelete = (uniqueKey) =>{
        firebaseDb.ref().child(`${selectedDegree}/${uniqueKey}`).remove(err=>{
            if(err){
                console.log("Error in FBD : ", err);
            }
        })
    }

    const onClickDownload = ({degree, uniqueKey, downloads }) => {
        firebaseDb.ref().child(`${degree}/${uniqueKey}/downloads`)
        .set(downloads+1, err=>{
            if(err){
                console.log("fireDb err:", err)
                window.alert(err?.message)
            }
        })
    }



    const getFilteredData = () => {
        let result = [];

        if(selectedSubject !== "All"){
            result = tableData.filter((item)=>item.subjectName === selectedSubject);
        }
        else{
            result = tableData;
        }

        if(searchText){
            result = result.filter((item)=>(
                item?.subjectName?.toLowerCase()?.includes(searchText?.toLowerCase()) 
                || item?.fileName?.toLowerCase()?.includes(searchText?.toLowerCase())))
        }
        return result;
    }

    const tableArrayData = getFilteredData();

    return(
        <div className={styles.tableCompWrapper}>
            <div className={styles.headerText}>Database</div>
            {isLoading ? <div className={styles.loaderWrapper}>
                    <Loader/>
                </div> : null}
            <div className={styles.dropDownWrapper}>
                <div className={classNames(styles.dropDownChildWrapper,styles.degreeDropDown)}>
                    <DropDown
                        onChangeData={onChangeDegree}
                        name={"name"}
                        label={"Select Degree"}
                        id={"id"} 
                        valueKey={"degree"}
                        data={degrees}
                    />
                </div>
                { isAdmin && <div className={classNames(styles.dropDownChildWrapper,styles.databaseDropDown)}>
                    <DropDown
                        onChangeData={onChangeDB}
                        name={"name"}
                        label={"Select Database"}
                        id={"id"} 
                        valueKey={"database"}
                        data={databaseTypes}
                    />
                </div>}
                <div className={classNames(styles.dropDownChildWrapper,styles.subjectDropDown)}>
                    <DropDown
                        value={selectedSubject}
                        onChangeData={onChangeSubject}
                        name={"name"}
                        label={"Select Subject"}
                        id={"id"} 
                        valueKey={"subject"}
                        data={subject}
                    />
                </div>
                <div className={classNames(styles.dropDownChildWrapper,styles.searchBox)}>
                    Search : <input className={styles.searchText} placeholder={"Type to Search"} type={"text"} value={searchText} onChange={onSearchChange}/>
                </div>
            </div>
            <div className={styles.tableWrapper}>
                { selectedDB === 'Storage' ? <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Sl no</th>
                            <th>Name</th>
                            <th>Linked</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {storageData.map((item, index)=>{
                           return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.name}</td>
                                <td className={item.isLinked ? styles.linked : styles.notLinked}>
                                    {item.isLinked === true ? "Linked" : "Not Linked"}</td>
                                <td>
                                    <button 
                                        className={styles.deleteBtn} 
                                        onClick={()=>{
                                            storage.ref().child(item.fullPath).delete();
                                            setIsDeleting(true);
                                        }}
                                    >Delete</button>
                                </td>
                            </tr>
                           )
                       }) }
                    </tbody>
                </table> : <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Sl no</th>
                            <th>Subject</th>
                            <th>Degree</th>
                            <th>File Name</th>
                            <th>Link</th>
                            <th>Downloads</th>
                            {isAdmin && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                       {tableArrayData.map((item, index)=>{
                           return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.subjectName}</td>
                                <td>{item.degree}</td>
                                <td>{item.fileName}</td>
                                <td><a 
                                    href={item.url}
                                    onClick={()=>onClickDownload({
                                        degree: item.degree,
                                        uniqueKey: item.uniqueKey,
                                        downloads: item.downloads,
                                    })} 
                                    target={'_blank'}
                                >Link</a></td>
                                <td>{item.downloads}</td>
                                {isAdmin && <td>
                                    <button className={styles.editBtn} onClick={()=>setData(item)}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={()=>onClickDelete(item.uniqueKey)}>Delete</button>
                                    </td>}
                            </tr>
                           )
                       }) }
                    </tbody>
                </table>}
            </div>
        </div>
    )
}

export default AdminDataTableComp;