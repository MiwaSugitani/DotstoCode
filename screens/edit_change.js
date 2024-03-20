import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, FlatList } from 'react-native';
import * as React from 'react';
import { collection, updateDoc, doc, getDocs } from 'firebase/firestore';
import db from "./firebase"; // Firebaseの設定をインポート

export default function Edit_ChangeScreen({ navigation }) {
  const [tasks, setTasks] = React.useState([]); // タスク一覧
  const [editedTasks, setEditedTasks] = React.useState({}); // 編集中のタスク内容
  const [editedWeeks, setEditedWeeks] = React.useState({}); // 編集中の週の内容

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
      const initialEditedTasks = {};
      const initialEditedWeeks = {};
      taskList.forEach((task) => {
        initialEditedTasks[task.id] = task.yarukoto;
        initialEditedWeeks[task.id] = task.week;
      });
      setEditedTasks(initialEditedTasks); // 編集中のタスク内容を初期化
      setEditedWeeks(initialEditedWeeks); // 編集中の週の内容を初期化
    } catch (e) {
      console.error("Error fetching tasks: ", e);
    }
  };

  // タスクを更新する関数
  const updateTask = async (taskId, newTaskContent, newWeek) => {
    try {
      await updateDoc(doc(db, 'posts', taskId), { yarukoto: newTaskContent, week: newWeek }); // Firebaseのデータを更新
      console.log("Document successfully updated!");
      fetchTasks(); // タスク一覧を再取得して更新された内容を反映する
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  // 各タスクのレンダリング用の関数
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item.yarukoto}</Text>
      <View style={styles.editContainer}>
        <TextInput
          style={styles.taskTextInput}
          value={editedTasks[item.id]}
          onChangeText={text => setEditedTasks({...editedTasks, [item.id]: text })}
        />
        <TextInput
          style={styles.weekTextInput}
          value={editedWeeks[item.id]}
          onChangeText={text => setEditedWeeks({...editedWeeks, [item.id]: text })}
        />
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => updateTask(item.id, editedTasks[item.id], editedWeeks[item.id])}
        >
          <Text style={styles.updateButtonText}>更新</Text>
        </TouchableOpacity>
      </View>
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
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  taskText: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 150,
    marginRight: 10,
  },
  weekTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 50,
  },
  updateButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
