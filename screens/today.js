import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// 画面遷移のためのライブラリをインポート
import { useNavigation } from '@react-navigation/native';

// 仮のやることリストのデータ
const todoListData = [
  { id: 1, task: '買い物に行く' },
  { id: 2, task: '映画を見る' },
  { id: 3, task: 'スポーツをする' },
];

export default function TodayScreen() {
  // React Navigationのナビゲーションオブジェクトを取得
  const navigation = useNavigation();
  // 今日の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dayOfWeek = today.toLocaleDateString('ja-JP', { weekday: 'long' }); // 曜日を取得

  // タスクをタップしたときの処理
  const handleTaskPress = (taskName) => {
    // ここでタスクIDを元に遷移先の画面に遷移する処理を追加
    navigation.navigate('Today_Detail', { taskName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          <Text style={[styles.largeText, { fontSize: 40, textAlign: 'center'}]}>
            {month}月{day}日{dayOfWeek}の{'\n'}
            やること
          </Text>
        </Text>
      </View>
      <View style={styles.taskList}>
        {todoListData.map((taskItem) => (
          <TouchableOpacity key={taskItem.id} onPress={() => handleTaskPress(taskItem.task)}>
            <Text style={styles.taskItem}>{taskItem.task}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  dateContainer: {
    backgroundColor: 'pink',
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 18,
  },
  largeText: {
    fontSize: 40,
  },
  taskList: {
    marginTop: 20,
  },
  taskItem: {
    fontSize: 20,
    marginBottom: 10,
  },
});
