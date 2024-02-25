import { useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import Button from './Button';
import { color, spacing, fontSize } from './StyleHelper';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FirestoreService from '../firebase-files/firebaseHelpers';

/**
 * Use header navigation based on the type of navigation.
 * 
 * @param {object} navigation - navigation object
 * @param {string} navigation.setOptions - set navigation options
 * @param {string} type - navigation type
 * @returns {void}
 */
const useHeaderNavigation = (navigation, route, type) => {
  console.log("navigation type", type);

  /**
   * Handle the delete activity action.
   * 
   * @param {void}
   * @returns {void}
   */
  const handleDelete = () => {
    console.log('Delete activity');
    Alert.alert(
      "Delete", 
      "Are you sure you want to delete this item?",
      [
          {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
          },
          { 
              text: "Yes", onPress: () => {
                  FirestoreService.deleteActivity(route.params.activity.id);
                  navigation.navigate('Activities');
              } 
          }
      ],
      { cancelable: false }
    );
  }

  // Set header navigation options based on the type of navigation.
  useLayoutEffect(() => {
    if (type == 'Add') {
      navigation.setOptions({
        title: 'Add An Activity',
        headerLeft: () => (
          <Button 
            text="<" 
            textColor={color.invalid}
            handleClick={() => navigation.navigate('Activities')} 
            style={{ fontSize: fontSize.large, marginLeft: spacing.medium, padding: spacing.small }}
          />
        ),
      });
    } else if (type == 'Edit') {
      navigation.setOptions({
        title: 'Edit',
        headerLeft: () => (
          <Button 
            text="<" 
            textColor={color.invalid}
            handleClick={() => navigation.navigate('All Activities')} 
            style={{ fontSize: fontSize.large, marginLeft: spacing.medium, padding: spacing.small }}
          />
        ),
        headerRight: () => (
          <FontAwesome 
            name="trash-o" 
            size={24} 
            color={color.commonText} 
            onPress={handleDelete}
            style={{ marginRight: spacing.large }}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Feather 
            name="plus" size={24} 
            color={color.commonText}  
            onPress={() => navigation.navigate('Add An Activity')}
            style={{ marginRight: spacing.large }}/>
        ),
      });
    }
  }, [navigation]);
};

export default useHeaderNavigation;
