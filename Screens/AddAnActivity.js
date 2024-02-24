import React, { useState, useContext } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import useHeaderNavigation from '../Components/useHeaderNavigation';
import { color, spacing } from '../Components/StyleHelper';
import Input from '../Components/Input';
import DropDownList from '../Components/DropDownList';
import CommonText from '../Components/CommonText';
import DatePicker from '../Components/DatePicker';
// import { ActivityContext } from '../Components/ActivityContext';
import PressableButton from '../Components/PressableButton';
import FirestoreService from '../firebase-files/firebaseHelpers';


/**
 * Render the AddAnActivities screen component.
 * 
 * @param {object} navigation - navigation object
 * @param {object} route - route object containing parameters
 * @returns {JSX.Element} - AddAnActivities screen component
 */
export default AddAnActivities = ({ navigation, route }) => {
    const [activityName, setActivityName] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsCheckBoxChecked(!isCheckBoxChecked);
    };

    useHeaderNavigation(navigation, route, route.params? 'Edit' : 'Add');
    console.log("route information:", route.params?.activity.important);

    // List of activities to be displayed in the dropdown list
    const dropDownListItems = ['Walking', 'Running', 'Swimming', 'Weights', 'Yoga', 'Cycling', 'Hiking'];

    // Initialize form fields with values from route params if available (for edit mode)
    React.useEffect(() => {
        if (route.params) {
            const { activity } = route.params;
            setActivityName(activity.activity);
            setDuration(activity.duration.toString());
            setDate(activity.date);
            const parsedDate = new Date(activity.date);
            setSelectedDate(parsedDate);
            console.log('Selected date: ', selectedDate);
            setShowDatePicker(false);
        }
    }, [route.params]);

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
        setShowDatePicker(!showDatePicker);
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
        setShowDatePicker(false);
    
        if (selectedDate && event.type === 'set') {
            const formattedDate = formatDate(selectedDate);
            setDate(formattedDate);
            setSelectedDate(selectedDate);
        }
    };

    // Get the addActivity function from the ActivityContext
    // const { addActivity } = useContext(ActivityContext);

    /**
     * Handle the save press, validate the input values, and add the activity
     * 
     * @param {void}
     * @returns {void}
     */
    const handleSavePress = () => {
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
        const isActivityImportant = (activityName === 'Running' || activityName === 'Weights') && durationValue >= 60;
        
        const newActivity = {
            activity: activityName, 
            date: selectedDate, 
            duration: durationValue,
            important: isActivityImportant,
        };

        if (route.params) {
            updateActivityInFirestore(route.params.activity.id, newActivity);
        } else {
            addActivityToFirestore(newActivity);
        }

        // addActivity(newActivity);
        // navigation.navigate('Activities')
    }

    /**
     * Add the activity to Firestore
     *  
     * @param {object} newActivity - new activity object
     * @returns {void}
     * @throws {error} - error adding activity
     */
    const addActivityToFirestore = async (newActivity) => {
        try {
            await FirestoreService.addActivity(newActivity);
            console.log('Activity added + Navigated to Activities screen');
            navigation.navigate('Activities');
        } catch (error) {
            console.error('Error adding activity: ', error);
        }
    }

    /**
     * Update the activity in Firestore
     * 
     * @param {string} activityId - activity ID
     * @param {object} updatedActivity - updated activity object
     * @returns {void}
     */
    const updateActivityInFirestore = async (activityId, updatedActivity) => {
        Alert.alert(
            "Important",
            "Are you sure you want to save these changes?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "Yes", 
                    onPress: () => updateActivityDetail(activityId, updatedActivity)
                }
            ],
            { cancelable: false }
        )
    }

    const updateActivityDetail = async (activityId, updatedActivity) => {
        const isActivityImportant = (updatedActivity.activity === 'Running' || updatedActivity.activity === 'Weights') && updatedActivity.duration >= 60;
        const shouldUpdateImportant = route.params ? isCheckBoxChecked ? false : isActivityImportant : isActivityImportant;
    
        updatedActivity = {
            ...updatedActivity,
            date: new Date(selectedDate),
            important: shouldUpdateImportant
        };
        
        try {
            await FirestoreService.updateActivity(activityId, updatedActivity);
            console.log('Activity updated');
            navigation.navigate('Activities');
        } catch (error) {
            console.error('Error updating activity: ', error);
        }
    };

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
                <DropDownList 
                    placeholder={'Select An Activity'} 
                    listItems={dropDownListItems} 
                    handleItemSelect={handleItemSelect}
                    selectedItem={activityName}
                />
                <CommonText />
                
                <CommonText text={'Duration (min)*'}/>
                <Input handleInput={handleDurationInput} text={duration}/>
                <CommonText />

                <CommonText text={'Date *'}/>
                <View>
                    {/* <Text onPress={handleDatePress} style={styles.dateText}>
                        {date || 'Select a Date'}
                    </Text> */}
                    <Input text={date} handleInput={()=>{}} onPressIn={handleDatePress}/>
                    
                    {showDatePicker && (
                        <DatePicker
                            selectedDate={selectedDate}
                            onDateChange={onDateChange}
                            setShowDatePicker={setShowDatePicker}
                        />
                    )}
                </View>
                <View style={styles.butomCompContainer}>
                    {   !showDatePicker && 
                        route.params && route.params.activity.important && (
                            <View style={styles.checkboxContainter}>
                                <Text style={styles.specialInfo}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
                                <Checkbox
                                    value={isCheckBoxChecked}
                                    onValueChange={handleCheckboxChange}
                                />
                            </View>
                        )
                    }
                    {   !showDatePicker && 
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
                    }
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
    dateText: {
        backgroundColor: color.background,
        borderColor: color.text,
        borderWidth: 2,
        height: spacing.xlarge,
        borderRadius: spacing.small,
        paddingLeft: spacing.small,
        paddingTop: spacing.small / 2,
        fontSize: 16,
    },
    datePickerContainer: {
        height: spacing.xxlarge*5,
    },
    butomCompContainer: {
        marginTop: spacing.xlarge*7,
    },
    checkboxContainter: {
        flexDirection: 'row', 
        alignItems: 'center',
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
    },
    specialInfo: {
        color: color.cardBackground,
        fontWeight: 'bold',
        width: '80%',
        marginLeft: spacing.large,
    },
});
