import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { ActivityContext } from './ActivityContext';
import { color, spacing } from './StyleHelper';

const ActivityItem = ({ activity }) => {
  return (
    <View style={styles.activity}>
      <Text style={styles.name}>
        {activity.name}
      </Text>
      {activity.special === true && (
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>!</Text>
        </View>
      )}
      <Text style={styles.date}>{activity.date}</Text>
      <Text style={styles.duration}>{activity.duration} min</Text>
    </View>
  );
};

export default ActivitiesList = ({ activityType }) => {
  const { activities } = useContext(ActivityContext);

  const filteredActivities = activities.filter(activity => 
    activityType === 'all' || (activityType === 'special' && activity.special)
  );

  const renderItem = ({ item }) => <ActivityItem activity={item} />;

  return (
    <FlatList
      style={styles.container}
      data={filteredActivities}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // borderWidth: 1,
    backgroundColor: color.transparent,
    paddingTop: spacing.large,
    paddingHorizontal: spacing.medium,
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
    width: spacing.large,
    height: spacing.large,
    backgroundColor: color.alert,
    borderRadius: spacing.medium,
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
