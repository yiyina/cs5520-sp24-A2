import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { color } from '../Components/StyleHelper';
import useHeaderNavigation from '../Components/useHeaderNavigation';
import ActivitiesList from '../Components/ActivitiesList';

/**
 * Render the SpecialActivities screen component.
 * 
 * @param {object} navigation - navigation object
 * @returns {JSX.Element} - SpecialActivities screen component
 */
export default SpecialActivities = ({ navigation }) => {
    useHeaderNavigation(navigation);

    return (
        <View style={styles.container}>
            <ActivitiesList activityType="special" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
})