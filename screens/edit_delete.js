import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import * as React from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from "./firebase"; // Firebaseの設定をインポート

export default function Edit_AddScreen({ navigation }) {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    // ページがロードされた際に、Firebaseからタスクの一覧を取得する
    fetchTasks();
  }, []);

  // Firebaseからタスクの一覧を取得する関数
  const fetchTasks = async () => {
    try {
      const taskList = [];
      const querySnapshot = await getDocs(collection(db, 'posts')); // ポストコレクション内の全てのドキュメントを取得
      querySnapshot.forEach((doc) => {
        taskList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // 曜日順に並べ替える
      const sortedTaskList = taskList.sort((a, b) => {
        return ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"].indexOf(a.week) - ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"].indexOf(b.week);
      });
      setTasks(taskList); // タスク一覧をセット
    } catch (e) {
      console.error("Error fetching tasks: ", e);
    }
  };

  // タスクを削除する関数
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'posts', taskId)); // Firestoreのデータを削除
      console.log("Document successfully deleted!");
      fetchTasks(); // タスク一覧を再取得して更新された内容を反映する
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  // 各タスクのレンダリング用の関数
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.yarukoto}</Text>
      <View style={styles.weekAndDeleteContainer}>
        <Text style={styles.weekText}>{item.week}</Text>
        <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButtonContainer}>
          <Text style={styles.deleteButton}>削除</Text>
        </TouchableOpacity>
      </View>
    </View>
    );    

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        消したいやることをタッチしてください
      </Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContainer: {
    flexDirection: 'column', // 方向をcolumnに変更して縦並びにする
    alignItems: 'flex-start',
    backgroundColor: 'lightblue',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    width: '97%',
    },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '95%',
  },
  taskTextContainer: {
    flex: 1, // 調整する
  },
  weekAndDeleteContainer: {
    flexDirection: 'row', // weekと削除ボタンを横並びにする
    justifyContent: 'space-between',
    width: '100%', // コンテナを幅いっぱいに広げる
  },
  taskText: {
    fontSize: 40, // 文字を大きくする
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  weekText: {
    fontSize: 35, // 曜日表示のサイズ調整
    marginRight: 20, // 必要に応じて調整
    marginTop: 10,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 35, // 文字を大きくする
  },
  deleteButtonContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    marginTop: 3,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 5,
  },
});
