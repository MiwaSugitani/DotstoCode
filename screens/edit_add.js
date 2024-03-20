import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import * as React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from "./firebase"; // Firebaseの設定をインポート

export default function Edit_AddScreen({ navigation }) {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedDay, setSelectedDay] = React.useState('');

  const addToDataSet = async () => {
    try {
      if (!inputValue.trim() || !selectedDay) {
        // インプット値が空または曜日が選択されていない場合、追加しない
        return;
      }

      // Firestoreのデータベースに既存の'post'コレクションを参照し、新しいドキュメントを追加
      const docRef = await addDoc(collection(db, 'posts'), { week: selectedDay, yarukoto: inputValue });
      console.log("Document written with ID: ", docRef.id);
      setInputValue(''); // 入力値をクリア
      setSelectedDay(''); // 曜日をクリア
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="やることをここに入力"
      />

      <TouchableOpacity
        style={styles.button2}
        onPress={addToDataSet}
      >
        <Text style={styles.buttonText}>追加</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('月曜日')}
      >
        <Text style={styles.buttonText}>月</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('火曜日')}
      >
        <Text style={styles.buttonText}>火</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('水曜日')}
      >
        <Text style={styles.buttonText}>水</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('木曜日')}
      >
        <Text style={styles.buttonText}>木</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('金曜日')}
      >
        <Text style={styles.buttonText}>金</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('土曜日')}
      >
        <Text style={styles.buttonText}>土</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('日曜日')}
      >
        <Text style={styles.buttonText}>日</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedDay('その他')}
      >
        <Text style={styles.buttonText}>その他</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: 300,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  button2: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
