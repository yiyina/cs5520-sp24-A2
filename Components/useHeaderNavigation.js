import { useLayoutEffect } from 'react';
import Button from './Button';
import { color, spacing, fontSize } from './StyleHelper';

/**
 * Use header navigation based on the type of navigation.
 * 
 * @param {object} navigation - navigation object
 * @param {string} navigation.setOptions - set navigation options
 * @param {string} type - navigation type
 * @returns {void}
 */
const useHeaderNavigation = (navigation, type) => {
  // Set header navigation options based on the type of navigation.
  useLayoutEffect(() => {
    if (type == 'Add') {
      navigation.setOptions({
        headerLeft: () => (
          <Button 
            text="<" 
            textColor={color.invalid}
            handleClick={() => navigation.navigate('All Activities')} 
            style={{ fontSize: fontSize.large, marginLeft: spacing.medium, padding: spacing.small }}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Button 
            text="Add" 
            textColor={color.alert}
            handleClick={() => navigation.navigate('Add An Activity')} />
        ),
      });
    }
  }, [navigation]);
};

export default useHeaderNavigation;
