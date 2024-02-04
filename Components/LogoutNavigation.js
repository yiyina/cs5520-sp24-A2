import { useLayoutEffect } from 'react';
import Button from '../Components/Button';
import { color } from '../Components/StyleHelper';

const LogoutNavigation = (navigation) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button 
          text="Logout" 
          textColor={color.invalid}
          handleClick={() => navigation.navigate('Start')} />
      ),
    });
  }, [navigation]);
};

export default LogoutNavigation;
