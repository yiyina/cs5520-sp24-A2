import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { color } from '../Components/StyleHelper';
import LogoutNavigation from '../Components/LogoutNavigation';

export default AllActivities = ({ navigation }) => {
    LogoutNavigation(navigation);

    return (
        <View style={styles.container}>
            <Text>AllActivities</Text>
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