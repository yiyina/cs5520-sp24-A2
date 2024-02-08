import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color, spacing } from './StyleHelper';

export default DatePicker = ({ selectedDate, onDateChange }) => {
    const handleOnChange = (event, selectedDate) => {
        onDateChange(event, selectedDate);
    }

    return (
        <View style={styles.datePickerContainer}>
            <DateTimePicker
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                style={styles.datePicker}
                value={selectedDate || new Date()}
                onChange={handleOnChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    datePickerContainer: {
        padding: spacing.small,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        // borderWidth: 2,
        // borderColor: color.text,
        borderRadius: spacing.small,
        marginTop: spacing.small,
    },
    datePicker: {
        color: 'white',
    }
})
