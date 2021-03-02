import React, { FC, useState } from 'react';
import { DataRowItem } from "../types";
import styles from '../styles/Home.module.css'

type AddDataRowItemProps = {
    addItem: (item: DataRowItem) => void;
    getNewId: ()=>number;
    fillFormItem: DataRowItem & {
        changed: boolean;
    };
    updateItem: (item: DataRowItem) => void;
    returnUpdateUtility: () => void;
    deleteItem: (id: number) => void;
};

export const AddDataRowItem: FC<AddDataRowItemProps> = ({ addItem, getNewId, fillFormItem, updateItem, returnUpdateUtility,deleteItem }) => {
    const [date, setDate] = useState(Date.now().toString());
    const [description, setDescription] = useState("");
    const [value, setValue] = useState(0);
    const [id, setID] = useState(-1);
    const [form, setForm] = useState("");
    
    if (!fillFormItem.changed) {
        fillFormItem.changed = true;
        setDate(fillFormItem.date);
        setDescription(fillFormItem.description);
        setValue(fillFormItem.value);
        setID(fillFormItem.id);
        setForm(fillFormItem.form);
    }
    
    const addDataRowItem = () => {
        const newDataRow: DataRowItem = {
            id: getNewId(),
            date: date,
            description: description,
            value: value,
            form: form
        };
        //console.log(newDataRow.id);
        addItem(newDataRow);
    };

    const updateDataRowItem = () => {
        const updatedDataRow: DataRowItem = {
            id: id,
            date: date,
            description: description,
            value: value,
            form: form
        };
        returnUpdateUtility();
        updateItem(updatedDataRow);
    };

    const deleteDataRowItem = () => {
        deleteItem(id);
    }

    return <div className={styles.addDataRowItem}>
        <div className={styles.addDataRowItemInputs}>
             ID: {id}<br/>
             Datum: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> <br/>
             Částka: <input value={value} onChange={(e) => setValue(parseFloat(e.target.value))} /> <br/>
             Popis: <input value={description} onChange={(e) => setDescription(e.target.value)} /> <br/>
             Forma: <input value={form} onChange={(e) => setForm(e.target.value)} /> 
        </div>
        <div className={styles.addDataRowItemButtons}>
            <button onClick={addDataRowItem}>Přidat</button>
            <button onClick={updateDataRowItem}>Upravit</button>
            <button onClick={deleteDataRowItem}>Smazat</button>
        </div>
    </div>;
};
