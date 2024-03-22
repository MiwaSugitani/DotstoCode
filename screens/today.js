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

  // ボタンスタイルと四角形スタイルを動的に決定
  const getButtonStyles = (who) => {
    switch (who) {
      case 'おばあちゃん':
        return [styles.button, styles.buttonGrandma];
      case 'おじいちゃん':
        return [styles.button, styles.buttonGrandpa];
      default:
        return [styles.button, styles.buttonDefault]; // whoがnullの場合
    }
  };

  const getSquareStyles = (who) => {
    return who ? styles.squareFilled : styles.square; // whoがnullの場合は黒い枠、それ以外は赤い背景
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
      <Text style={styles.text}>
            完了したらタッチしてください
          </Text>
      {posts.map((post)=>(
        <TouchableOpacity
        key={post.id}
        style={getButtonStyles(post.who)}
        onPress={() => handleTaskPress(post)}
      >
        <Text style={styles.buttonText}>{post.yarukoto}</Text>
        <View style={getSquareStyles(post.who)}>
          {post.who !== undefined && (
            <Text style={styles.checkMark}>✓</Text>
          )}
        </View>
      </TouchableOpacity>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE073',
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
  taskItem: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 40,
    borderRadius: 10,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDefault: {
    backgroundColor: 'white', // 白背景
  },
  buttonGrandma: {
    backgroundColor: '#FFE4E1', // 薄いピンク
  },
  buttonGrandpa: {
    backgroundColor: '#ADD8E6', // 水色
  },
  square: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'black',
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -25 }], // 中央に配置
    marginTop: 40, 
    borderRadius: 10,
  },
  squareFilled: {
    width: 50,
    height: 50,
    backgroundColor: 'red', // 赤い背景
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -25 }],
    marginTop: 40, 
    borderRadius: 10,
    alignItems: 'center', // チェックマークを中央に配置
    justifyContent: 'center', // チェックマークを中央に配置
  },
  checkMark: {
    color: 'black', // チェックマークの色
    fontSize: 40, // チェックマークのサイズを大きくする
    fontWeight: 'bold', // チェックマークを太くする
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

