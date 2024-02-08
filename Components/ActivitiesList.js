import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { ActivityContext } from './ActivityContext';
import { color, spacing } from './StyleHelper';

export default ActivitiesList = ({ activityType }) => {
  
  const { activities } = useContext(ActivityContext);

  const filteredActivities = activities.filter(activity => 
    activityType === 'all' || (activityType === 'special' && activity.special)
  );

  return (
    <View style={styles.container}>
      {filteredActivities.map((activity, index) => (
        <View key={index} style={styles.activity}>
          <Text style={styles.name}>
            {activity.activity}
          </Text>
          {activity.type === 'special' && (
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>!</Text>
            </View>
          )}
          <Text>{activity.date}</Text>
          <Text>{activity.duration}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    backgroundColor: color.transparent,
    paddingTop: spacing.xlarge,
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.small,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    height: spacing.xxlarge,
    backgroundColor: color.cardBackground,
    marginVertical: 5,
  },
  name: {
    color: 'white',
  },
  iconContainer: {
    width: 20,
    height: 20,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
