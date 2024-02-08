import React from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
        <View style={styles.datePickerContainer}>
            <DateTimePicker
                mode="date"
                display={'inline'}
                style={styles.datePicker}
                value={selectedDate || new Date()}
                onChange={handleOnChange}
            />
        </View>
    );
};
