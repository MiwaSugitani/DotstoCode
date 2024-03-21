import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// 画面遷移のためのライブラリをインポート
import { useNavigation, useRoute } from '@react-navigation/native';
import db from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; 

export default function TodayScreen() {
  const [posts, setPosts] = useState([]);
  const route = useRoute();
  const [who, setWho] = useState('');

  useEffect(() => {
    // route.paramsからwhoの値を取得して状態にセット
    if (route.params?.who) {
      setWho(route.params.who);
    }
    //データを取得する
    //const postData = collection(db,"posts");
    //getDocs(postData).then((snapShot) => {
      //console.log(snapShot.docs.map((doc)=>({...doc.data()})));
      //setPosts(snapShot.docs.map((doc)=>({...doc.data()})));
    //});
    //データを取得する
  const fetchData = async () => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
    
      // Firestoreのクエリで使用する開始と終了の日付を取得
      const startDate = new Date(year, month - 1, day);
      const endDate = new Date(year, month - 1, day + 1); // 終了日は翌日の0時とすることで、今日のデータのみを取得
      
      //クエリ
      const q = query(collection(db, "posts"), where("date", ">=", startDate), where("date", "<", endDate));
      const querySnapshot = await getDocs(q);
      //const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const data = [];

        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          // タイムスタンプ型のdateフィールドを日付型に変換
          const date = postData.date.toDate(); // タイムスタンプを日付に変換
          data.push({ id: doc.id, ...postData, date });
    });
        
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // エラーが発生した場合の処理を追加
    }
  };

  fetchData(); // fetchData 関数を呼び出す
}, [route.params?.who]); // 依存配列にroute.params?.whoを追加

  // React Navigationのナビゲーションオブジェクトを取得
  const navigation = useNavigation();
  // 今日の日付を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dayOfWeek = today.toLocaleDateString('ja-JP', { weekday: 'long' }); // 曜日を取得

  // タスクをタップしたときの処理
  const handleTaskPress = (post) => {
    if (post.who) {
      navigation.navigate('完了画面', { 
        id: post.id, 
        yarukoto: post.yarukoto,
        who: post.who,
        year: year,
        month: month,
        day: day,
        dayOfWeek: dayOfWeek,
        });
    } else {
      navigation.navigate('今日の詳細', { 
        id: post.id, 
        yarukoto: post.yarukoto,
        year: year,
        month: month,
        day: day,
        dayOfWeek: dayOfWeek,
        who: post.who || '',
      });
    }
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
      {posts.map((post)=>(
        <TouchableOpacity
        key={post.id}
        style={[styles.button, { fontSize: 20, textAlign: 'center'}]}
        onPress={() => handleTaskPress(post)}
      >
          <Text key={post.id} style={[styles.largeText, { fontSize: 30, textAlign: 'center'}]}>
            {post.yarukoto}
        </Text>
        {post.who ? (
            <View style={styles.square}></View>
          ) : (
            <View style={styles.square2}></View>
          )}
      </TouchableOpacity>
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
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    width: 350,
  },
  button_ma: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    width: 350,
  },
  button_fa: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10,
    width: 350,
  },
  buttonText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  dateContainer: {
    backgroundColor: 'pink',
    padding: 5,
    borderRadius: 10,
    marginVertical: 10,
  },
  square: {
    width: 50,
    height: 50,
    backgroundColor: 'red', // 四角形の背景色
    position: 'absolute',
    right: 0,
    right:10, // 左に寄せる
    top: '50%',
    marginTop: 10, // 上部のマージンを調整してセンタリング
  },
  square2: {
    width: 50,
    height: 50,
    borderWidth: 3, // 縁の太さ
    borderColor: 'black', // 縁の色
    position: 'absolute',
    right:10, // 左に寄せる
    top: '50%',
    marginTop: 10, // 上部のマージンを調整してセンタリング
  },
});
