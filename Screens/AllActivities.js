import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { color } from '../Components/StyleHelper';
import useHeaderNavigation from '../Components/useHeaderNavigation';

export default AllActivities = ({ navigation }) => {
    useHeaderNavigation(navigation);

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