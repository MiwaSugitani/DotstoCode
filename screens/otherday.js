import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import db from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; 


export default function OtherdayScreen({route}) {
  const selectedDate = route.params.selectedDate; // パラメータを取得

  let year = selectedDate.slice(0, 4);
  let month = selectedDate.slice(5, 7);
  let day = selectedDate.slice(8, 10);

  //データ読み込み
  const [posts, setPosts] = useState([]);
  //const route = useRoute();
  const [who, setWho] = useState('');

  useEffect(()=>{

    if (route.params?.who) {
      setWho(route.params.who);
    }

    const fetchData = async () => {
      try{
        //year, month, dayを文字列型から数値型へ変換
        year = Number(year);
        month = Number(month);
        day = Number(day);

        // Firestoreのクエリで使用する開始と終了の日付を取得
        let startDate = new Date(year, month - 1, day, 0, 0, 0);
        startDate.setHours(startDate.getHours());
        let endDate = new Date(year, month - 1, day + 1, 0, 0, 0); // 終了日は翌日の0時とすることで、今日のデータのみを取得
        endDate.setHours(endDate.getHours());

        //クエリ
        const q = query(collection(db, "posts"), where("date", ">=", startDate), where("date", "<", endDate));
        const querySnapshot = await getDocs(q);

        const data = [];

        querySnapshot.forEach((doc) => {
        const postData = doc.data();
        // タイムスタンプ型のdateフィールドを日付型に変換
        const date = postData.date.toDate(); // タイムスタンプを日付に変換
        data.push({ id: doc.id, ...postData, date });
      });

      setPosts(data);

      }catch(error){
        console.error('Error fetching data:', error);
        // エラーが発生した場合の処理を追加    
      }
    };

    fetchData(); // fetchData 関数を呼び出す
  }, [selectedDate, route.params?.who]);// selectedDateをOther_today.jsに渡す＆依存配列にroute.params?.whoを追加

  // React Navigationのナビゲーションオブジェクトを取得
  const navigation = useNavigation();

  //曜日を取得
  const newDate = new Date(selectedDate);
  const dayOfWeek = newDate.toLocaleDateString('ja-JP', { weekday: 'long' }); 

  // タスクをタップしたときの処理
  const handleTaskPress = (post) => {
    if (post.who) {
      navigation.navigate('完了今日以外画面', { 
        id: post.id, 
        yarukoto: post.yarukoto,
        who: post.who,
        year: year,
        month: month,
        day: day,
        dayOfWeek: dayOfWeek,
        });
    } else {
      navigation.navigate('今日以外詳細画面', { 
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
    <Text style={styles.text}>
      完了したらタッチしてください
    </Text>
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
    textAlign: 'center',
  },
  taskList: {
    marginTop: 20,
    textAlign: 'center',
  },
  taskItem: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});
