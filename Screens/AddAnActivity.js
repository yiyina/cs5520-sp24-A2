import React from 'react';
import { StyleSheet, View } from 'react-native';
import useHeaderNavigation from '../Components/useHeaderNavigation';
import { color, spacing } from '../Components/StyleHelper';
import Input from '../Components/Input';
import DropDownList from '../Components/DropDownList';
import CommonText from '../Components/CommonText';

export default AddAnActivities = ({ navigation }) => {
    useHeaderNavigation(navigation, 'Add');
    const dropDownListItems = ['Swimming', 'Weights', 'Yoga', 'Cycling', 'Hiking'];

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <CommonText text={'Activity *'} />
                <DropDownList placeholder={'Select An Activity'} listItems={dropDownListItems}/>
                <CommonText />
                
                <CommonText text={'Duration (min)*'}/>
                <Input />
                <CommonText />

                <CommonText text={'Date *'}/>
                <Input />
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
