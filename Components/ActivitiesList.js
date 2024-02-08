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
          <Text style={styles.date}>{activity.date}</Text>
          <Text style={styles.duration}>{activity.duration} min</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '85%',
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
    marginVertical: spacing.small,
  },
  name: {
    color: color.commonText,
    flexGrow: 1,
  },
  iconContainer: {
    width: 20,
    height: 20,
    backgroundColor: color.alert,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.small,
  },
  icon: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    backgroundColor: color.commonText,
    textAlign: 'center',
    padding: spacing.small,
    marginHorizontal: spacing.small,
  },
  duration: {
    backgroundColor: color.commonText,
    textAlign: 'center',
    padding: spacing.small,
    width: spacing.large*4,
    marginLeft: 'auto',
  }
});
