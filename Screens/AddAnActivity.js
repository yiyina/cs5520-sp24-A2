import React, { useState, useContext } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import useHeaderNavigation from '../Components/useHeaderNavigation';
import { color, spacing } from '../Components/StyleHelper';
import Input from '../Components/Input';
import DropDownList from '../Components/DropDownList';
import CommonText from '../Components/CommonText';
import DatePicker from '../Components/DatePicker';
import { ActivityContext } from '../Components/ActivityContext';
import PressableButton from '../Components/PressableButton';
import { firestore } from '../firebaseConfig';
import FirestoreService from '../Service/FirestoreService';


/**
 * Render the AddAnActivities screen component.
 * 
 * @param {object} navigation - navigation object
 * @returns {JSX.Element} - AddAnActivities screen component
 */
export default AddAnActivities = ({ navigation }) => {
    const [activityName, setActivityName] = useState('');
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
        setActivityName(activity);
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
    const handleSavePress = async () => {
        console.log('Save Pressed');
        if (activityName === null || duration.trim() === '' || date.trim() === '') {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        } 
        
        const durationValue = parseInt(duration.trim(), 10);
        if (isNaN(durationValue) || !Number.isInteger(durationValue) || durationValue < 0) { // Check if not a valid integer
            Alert.alert('Invalid Duration', 'Duration must be a valid integer');
            return;
        }

        console.log('Activity: ', activityName, 'Duration: ', duration, 'Date: ', date);
        
        const newActivity = {
            activity: activityName, 
            date: selectedDate, 
            duration: durationValue,
            important: (activityName === 'Running' || activityName === 'Weights') && durationValue >= 60,
        };

        // addActivity(newActivity);
        // navigation.navigate('Activities')
        try {
            await FirestoreService.addActivity(newActivity);
            navigation.navigate('Activities');
        } catch (error) {
            console.error('Error adding activity: ', error);
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
                <Input text={date} onPressIn={handleDatePress}/>
                <View style={styles.datePickerContainer}>
                    {showDatePicker && (
                        <DatePicker
                            selectedDate={selectedDate}
                            onDateChange={onDateChange}
                        />
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <PressableButton 
                        customStyle={styles.cancelButton} 
                        onPressFunction={()=> navigation.navigate('Activities')} 
                        pressedStyle={styles.pressedButton}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </PressableButton>
                    <PressableButton 
                        customStyle={styles.saveButton} 
                        onPressFunction={handleSavePress} 
                        pressedStyle={styles.pressedButton}>
                        <Text style={styles.buttonText}>Save</Text>
                    </PressableButton>
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
        paddingHorizontal: spacing.large,
    },
    buttonText: {
        color: color.commonText,
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: color.warning,
    },
    saveButton: {
        backgroundColor: color.cardBackground,
    },
    pressedButton: {
        opacity: 0.5,
    }
});
