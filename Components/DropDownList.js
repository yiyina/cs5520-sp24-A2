import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { color, spacing } from './StyleHelper';

export default DropDownList = ({ placeholder, listItems }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    // The initial value of items should be set during component mounting.
    useEffect(() => {
        if (listItems && Array.isArray(listItems)) {
            const transformedList = listItems.map(item => ({ label: item, value: item }));
            setItems(transformedList);
        }
    }, [listItems]);

    return (
        <DropDownPicker
            style={styles.dropDown}
            labelStyle={styles.label}
            placeholder= {placeholder}
            placeholderStyle={{color: color.text}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    )
}

const styles = StyleSheet.create({
    dropDown: {
        backgroundColor: color.transparent,
        color: color.text,
        borderColor: color.text,
        borderWidth: 2,
    },
    label: {
        color: color.text,
    }
})