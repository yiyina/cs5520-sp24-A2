import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const styles = StyleSheet.create({})
