import React, { useState, useContext } from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import useHeaderNavigation from '../Components/useHeaderNavigation';
import { color, spacing } from '../Components/StyleHelper';
import Input from '../Components/Input';
import DropDownList from '../Components/DropDownList';
import CommonText from '../Components/CommonText';
import DatePicker from '../Components/DatePicker';
import Button from '../Components/Button';
import { ActivityContext } from '../Components/ActivityContext';

/**
 * Render the AddAnActivities screen component.
 * 
 * @param {object} navigation - navigation object
 * @returns {JSX.Element} - AddAnActivities screen component
 */
export default AddAnActivities = ({ navigation }) => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useHeaderNavigation(navigation, 'Add');

    // List of activities to be displayed in the dropdown list
    const dropDownListItems = ['Walking', 'Running', 'Swimming', 'Weights', 'Yoga', 'Cycling', 'Hiking'];

    /**
     * Handle the selected item from the dropdown list
     * 
     * @param {string} activity - selected activity
     * @returns {void}
     */
    const handleItemSelect = (activity) => {
        console.log('Selected item: ', activity);
        setActivity(activity);
    }

    /** 
     * Handle the duration input
     * 
     * @param {string} duration - duration input
     * @returns {void}
     */
    const handleDurationInput = (duration) => {
        console.log('Duration: ', duration);
        setDuration(duration);
    }

    /**
     * Format the date to a string
     * 
     * @param {Date} date - date object
     * @returns {string} - formatted date string
     */
    const formatDate = (date) => {
        if (date instanceof Date) {
            return date.toDateString(); 
        }
        return '';
    }

    /**
     * Handle the date press, show the date picker
     * 
     * @param {void}
     * @returns {void}
     */
    const handleDatePress = () => {
        setShowDatePicker(true);
        setDate(formatDate(selectedDate));
    }

    /**
     * Toggle the date picker
     * 
     * @param {void}
     * @returns {void}
     */
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    /** 
     * Handle the date change, update the date state, and show/hide the date picker
     * 
     * @param {object} event - event object
     * @param {Date} selectedDate - selected date
     * @returns {void}
     */
    const onDateChange = (event, selectedDate) => {
        console.log('Selected date: ', selectedDate);
        if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            setDate(formattedDate); // Update the date state with the formatted date
            if (event.type === 'set') {
                setShowDatePicker(false);
                setSelectedDate(selectedDate);
            }
        }
    };

    // Get the addActivity function from the ActivityContext
    const { addActivity } = useContext(ActivityContext);

    /**
     * Handle the save press, validate the input values, and add the activity
     * 
     * @param {void}
     * @returns {void}
     */
    const handleSavePress = () => {
        console.log('Save Pressed');
        if (activity === null || duration.trim() === '' || date.trim() === '') {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        } else {
            const durationValue = parseInt(duration.trim(), 10);
            if (isNaN(durationValue) || !Number.isInteger(durationValue)) { // Check if not a valid integer
                Alert.alert('Invalid Duration', 'Duration must be a valid integer');
                return;
            }

            console.log('Activity: ', activity, 'Duration: ', duration, 'Date: ', date);
            
            const newActivity = {
                name: activity, 
                duration: durationValue,
                date: date, 
                special: (activity === 'Running' || activity === 'Weights') && durationValue >= 60,
            };

            addActivity(newActivity);
            navigation.navigate('Activities')
        }
    }

    /**
     * Render the AddAnActivities screen component
     * 
     * @param {void}
     * @returns {JSX.Element}
     */
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <CommonText text={'Activity *'} />
                <DropDownList placeholder={'Select An Activity'} listItems={dropDownListItems} handleItemSelect={handleItemSelect}/>
                <CommonText />
                
                <CommonText text={'Duration (min)*'}/>
                <Input handleInput={handleDurationInput} text={duration}/>
                <CommonText />

                <CommonText text={'Date *'}/>
                <Pressable onPress={toggleDatePicker}>
                    <Input handleInput={handleDatePress} text={date} onFocus={handleDatePress}/>
                </Pressable>
                <View style={styles.datePickerContainer}>
                    {showDatePicker && (
                        <DatePicker
                            selectedDate={selectedDate}
                            onDateChange={onDateChange}
                        />
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <Button text={'Cancel'} handleClick={()=> navigation.navigate('Activities')} style={styles.cancelButton}/>
                    <Button text={'Save'} handleClick={handleSavePress} style={styles.saveButton}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },
    form: {
        marginTop: spacing.xxlarge,
        marginHorizontal: spacing.large,
    },
    text: {
        color: color.text,
        fontWeight: 'bold',
    },
    datePickerContainer: {
        height: spacing.xxlarge*6,
    },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: spacing.large,
        paddingHorizontal: spacing.xxlarge,
    },
    cancelButton: {
        color: color.warning,
    },
    saveButton: {
        color: color.text,
    },
});
