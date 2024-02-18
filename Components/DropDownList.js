import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { color } from './StyleHelper';

/**
 * Render the DropDownList component with placeholder, listItems, and handleItemSelect properties.
 * 
 * @param {object} props - DropDownList properties
 * @param {string} props.placeholder - dropdown placeholder
 * @param {array} props.listItems - dropdown list items
 * @param {function} props.handleItemSelect - dropdown item select handler
 * @returns {JSX.Element} - DropDownList component
 */
export default DropDownList = ({ placeholder, listItems, handleItemSelect }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    // The initial value of items should be set during component mounting.
    useEffect(() => {
        if (listItems && Array.isArray(listItems)) {
            const transformedList = listItems.map(item => ({ label: item, value: item }));
            setItems(transformedList);
        }
    }, []);

    /**
     * Handle the selected item from the dropdown list
     * 
     * @param {string} itemValue - selected item value
     * @returns {void}
     */
    const handleValueChange = (itemValue) => {
        setValue(itemValue);
        handleItemSelect(itemValue);
    }

    return (
        <DropDownPicker
            style={styles.dropDown}
            labelStyle={styles.label}
            textStyle={styles.text}
            placeholder= {placeholder}
            placeholderStyle={{color: color.text}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={handleValueChange}
        />
    )
}

const styles = StyleSheet.create({
    dropDown: {
        backgroundColor: color.transparent,
        borderColor: color.text,
        borderWidth: 2,
    },
    label: {
        color: color.text,
    },
    text: {
        color: color.text,
    },
})