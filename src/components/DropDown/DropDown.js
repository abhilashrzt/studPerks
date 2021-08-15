import React from 'react';
import styles from './DropDown.module.css';

const DropDown = ({value, data, onChangeData, name, id, key, valueKey, label}) => {
    return (
        <>
            <label className={styles.labelWrapper}>{label || name} : </label>
            <select 
                value={value} 
                className={styles.dropDownElement} 
                name={name}
                id={id} 
                onChange={(e)=>onChangeData({key: valueKey, value: e.target.value})}
            >
                {
                    data.map((item)=><option value={item}>{item}</option>)
                }
            </select> 
        </>
    )
}

export default DropDown;