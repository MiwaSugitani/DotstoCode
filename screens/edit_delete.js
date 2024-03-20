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
    <View style={styles.taskItem}>
      <Text>{item.week}: {item.yarukoto}</Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>削除</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
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
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '90%',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
