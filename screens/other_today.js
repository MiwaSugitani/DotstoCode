import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function Other_TodayScreen() {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigation = useNavigation();

    const dayPress = (day) => {
      //選択された日付を取得
      const selectedDay = day.dateString;

      //日付をStateに設定
      setSelectedDate(selectedDay);

    };

    useEffect(() => {
      // selectedDate の値が変更されたときに呼び出される
      // 他のページに遷移
      if(selectedDate) {
        navigation.navigate('OtherdayScreen', {selectedDate});
      }
    }, [selectedDate, navigation]);

    return(
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={{ fontSize: 40 ,textAlign: 'center'}}>いつのやることが{'\n'}見たいですか？</Text>
        </View>
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
    backgroundColor: '#bba8e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: 'pink',
    padding: 5,
    bordarRadius: 10,
    marginVertical: 10
  },
  calendar: {
    top: 50,
    height: 400,
    width: 390,
  },
});