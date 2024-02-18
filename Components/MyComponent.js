import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

/**
 * Render the MyComponent component.
 * 
 * @param {object} props - MyComponent properties
 * @returns {JSX.Element} - MyComponent component
 */
const MyComponent = () => {
  const [date, setDate] = useState(new Date());

  /**
   * Handle the date change event.
   * 
   * @param {Event} event - date change event
   * @param {Date} selectedDate - selected date
   * @returns {void}
   */
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
