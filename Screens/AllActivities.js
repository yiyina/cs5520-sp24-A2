import { StyleSheet, View } from 'react-native';
import React from 'react';
import { color } from '../Components/StyleHelper';
import useHeaderNavigation from '../Components/useHeaderNavigation';
import ActivitiesList from '../Components/ActivitiesList';

/**
 * Render the AllActivities screen component.
 * 
 * @param {object} navigation - navigation object
 * @returns {JSX.Element} - AllActivities screen component
 */
export default AllActivities = ({ navigation }) => {
    useHeaderNavigation(navigation);

    return (
        <View style={styles.container}>
            <ActivitiesList activityType="all" />
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