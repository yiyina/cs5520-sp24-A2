import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color, spacing } from './StyleHelper';

/**
 * Render the DatePicker component with selectedDate and onDateChange properties to handle date change events.
 * 
 * @param {object} props - DatePicker properties
 * @param {Date} props.selectedDate - selected date
 * @param {function} props.onDateChange - date change event handler
 * @returns {JSX.Element} - DatePicker component
 */
export default DatePicker = ({ selectedDate, onDateChange }) => {
    const handleOnChange = (event, selectedDate) => {
        onDateChange(event, selectedDate);
    }

    return (
        <View>
            <DateTimePicker
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                value={selectedDate || new Date()}
                onChange={handleOnChange}
            />
        </View>
    );
};