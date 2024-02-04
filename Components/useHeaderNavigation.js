import { useLayoutEffect } from 'react';
import Button from './Button';
import { color, spacing, fontSize } from './StyleHelper';

const useHeaderNavigation = (navigation, type) => {
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
        headerLeft: () => (
          <Button 
            text="Logout" 
            textColor={color.invalid}
            handleClick={() => navigation.navigate('Start')} />
        ),
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
