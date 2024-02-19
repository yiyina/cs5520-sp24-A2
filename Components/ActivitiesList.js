import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { ActivityContext } from './ActivityContext';
import { color, spacing } from './StyleHelper';
import { FontAwesome } from '@expo/vector-icons';

/**
 * Render the ActivityItem component.
 * 
 * @param {object} activity - activity object
 * @param {string} activity.name - activity name
 * @returns {JSX.Element} - ActivityItem component
 */
const ActivityItem = ({ item }) => {
  return (
    <View style={styles.activity}>
      <Text style={styles.name}>
        {item.activity}
      </Text>
      {item.important && (
        <FontAwesome 
          name="exclamation-triangle" 
          size={spacing.large} 
          color={color.alert}
          style={{marginRight:spacing.small}} />
      )}
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.duration}>{item.duration} min</Text>
    </View>
  );
};

/**
 * Render the ActivitiesList component by filtering activities based on activity type.
 * 
 * @param {string} activityType - activity type
 * @returns {JSX.Element} - ActivitiesList component
 */
export default ActivitiesList = ({ activityType }) => {
  const { activities } = useContext(ActivityContext);

  const filteredActivities = activities.filter(activity => 
    activityType === 'all' || (activityType === 'special' && activity.important)
  );

  const renderItem = ({ item }) => <ActivityItem item={item} />;

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
