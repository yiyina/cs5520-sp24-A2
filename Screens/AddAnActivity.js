import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../Components/StyleHelper';
import useHeaderNavigation from '../Components/useHeaderNavigation';

export default AddAnActivities = ({ navigation }) => {
    useHeaderNavigation(navigation, 'Add');

    return (
        <View style={styles.container}>
            <Text>Add An Activity</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
