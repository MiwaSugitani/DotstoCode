import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Other_TodayScreen() {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigation = useNavigation();

    const dayPress = (day) => {
      //選択された日付を取得
      const selectedDay = day.dateString;

      //日付をStateに設定
      setSelectedDate(selectedDay);

      //他のページに遷移
      navigation.navigate('OtherdayScreen', {selectedDate});

    };

    return(
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>今日以外のタスク</Text>
        <Calendar
          style = {styles.calendar}
          markedDates={{[selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }}}
          onDayPress={dayPress}
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    top: 50,
    width: 300,
  },
});