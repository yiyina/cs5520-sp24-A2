import React, { useState, useContext } from 'react';
import { StyleSheet, View, Pressable, Platform, Text, Alert } from 'react-native';
import useHeaderNavigation from '../Components/useHeaderNavigation';
import { color, spacing } from '../Components/StyleHelper';
import Input from '../Components/Input';
import DropDownList from '../Components/DropDownList';
import CommonText from '../Components/CommonText';
import DatePicker from '../Components/DatePicker';
import Button from '../Components/Button';
import { ActivityContext } from '../Components/ActivityContext';

export default AddAnActivities = ({ navigation }) => {
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [type, setType] = useState('');

    useHeaderNavigation(navigation, 'Add');

    const dropDownListItems = ['Walking', 'Running', 'Swimming', 'Weights', 'Yoga', 'Cycling', 'Hiking'];

    const handleItemSelect = (activity) => {
        console.log('Selected item: ', activity);
        setActivity(activity);
    }

    const handleDurationInput = (duration) => {
        console.log('Duration: ', duration);
        setDuration(duration);
    }

    const formatDate = (date) => {
        if (date instanceof Date) {
            return date.toDateString(); 
        }
        return '';
    }

    const handleDatePress = () => {
        setShowDatePicker(true);
        setDate(formatDate(selectedDate));
    }

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const onDateChange = (event, selectedDate) => {
        console.log('Selected date: ', selectedDate);
        if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            setDate(formattedDate); // Update the date state with the formatted date
            setSelectedDate(selectedDate); // Update the selectedDate state
            setShowDatePicker(false); 
        }
    };

    const { addActivity } = useContext(ActivityContext);

    const handleSavePress = () => {
        console.log('Save Pressed');
        if (activity === null || duration.trim() === '' || date.trim() === '') {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        } else {
            const durationValue = parseInt(duration.trim());
            if (isNaN(durationValue) || !Number.isInteger(durationValue)) { // Check if not a valid integer or greater than 60
                Alert.alert('Invalid Duration', 'Duration must be a valid integer');
                return;
            }

            setType(durationValue >= 60 ? 'special' : 'all');

            console.log('Type: ', type, 'Activity: ', activity, 'Duration: ', duration, 'Date: ', date);
            const newActivity = { type, activity, duration, date };
            addActivity(newActivity);
            navigation.navigate('Activities')
        }
    }

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
                {showDatePicker && (
                    <DatePicker
                        selectedDate={selectedDate}
                        onDateChange={onDateChange}
                    />
                )}
                <Button text={'Cancel'} handleClick={()=> navigation.navigate('Activities')}/>
                <Button text={'Save'} handleClick={handleSavePress}/>
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
});
