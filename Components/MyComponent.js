import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
      />
      <Text>Selected Date: {date.toDateString()}</Text>
    </View>
  );
};

export default MyComponent;
