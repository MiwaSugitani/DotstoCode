import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// 画面遷移のためのライブラリをインポート
import { useNavigation } from '@react-navigation/native';
import db from "./firebase";
import { collection, getDocs } from "firebase/firestore"; 

export default function TodayScreen() {
  const [posts,setPosts]=useState([]);

  useEffect(() => {
    //データを取得する
    //const postData = collection(db,"posts");
    //getDocs(postData).then((snapShot) => {
      //console.log(snapShot.docs.map((doc)=>({...doc.data()})));
      //setPosts(snapShot.docs.map((doc)=>({...doc.data()})));
    //});
    //データを取得する
  const fetchData = async () => {
    try {
      const postData = collection(db, "posts");
      const querySnapshot = await getDocs(postData);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // エラーが発生した場合の処理を追加
    }
  };

  fetchData(); // fetchData 関数を呼び出す
  },[]);

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
      {/* <View style={styles.taskList}>
        {todoListData.map((taskItem) => (
          <TouchableOpacity key={taskItem.id} onPress={() => handleTaskPress(taskItem.task)}>
            <Text style={styles.taskItem}>{taskItem.task}</Text>
          </TouchableOpacity>
        ))}
      </View> */}
      {posts.map((post)=>(
        <Text style={[styles.largeText, { fontSize: 30, textAlign: 'center'}]}>
        {post.yarukoto}
      </Text>
      ))}
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
