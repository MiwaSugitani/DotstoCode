import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import * as React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from "./firebase"; // Firebaseの設定をインポート

export default function Edit_AddScreen({ navigation }) {
  const [inputValue, setInputValue] = React.useState('');
  const [selectedDay, setSelectedDay] = React.useState('');

  const handleDayPress = (day) => {
    setSelectedDay(selectedDay === day ? '' : day);
    // 「その他」が選択された場合のみ画面遷移
    //if (day === 'その他') {
      //navigation.navigate('OtherScreen'); // 'OtherScreen'は遷移先の画面名。実際の画面名に合わせて変更してください。
    //}
  };

  const addToDataSet = async () => {
    if (!inputValue.trim() || !selectedDay) {
      // インプット値が空または曜日が選択されていない場合、追加しない
      console.log("No input value or day selected");
      return;
    }
    try {
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

    {['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日', 'その他'].map((day) => (
      <TouchableOpacity
      key={day}
      style={[styles.button, selectedDay === day ? styles.selected : null]}
      onPress={() => handleDayPress(day)}
    >
      <Text style={styles.buttonText}>{day}</Text>
    </TouchableOpacity>
  ))}

  <TouchableOpacity
    style={styles.button2}
    onPress={addToDataSet}
  >
    <Text style={styles.buttonText}>追加</Text>
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
height: 57,
backgroundColor: 'lightgrey', 
borderWidth: 2,
paddingHorizontal: 10,
marginBottom: 10,
width: 270,
textAlign: 'center',
fontSize: 25,
borderRadius: 5,
},
button: {
marginTop: 5,
backgroundColor: 'white',
padding: 14,
borderRadius: 5,
width: 170,
textAlign: 'center',
},
selected: {
borderColor: 'black',
borderWidth: 3,
textAlign: 'center',
},
button2: {
marginTop: 8,
backgroundColor: 'lightblue',
padding: 13,
borderRadius: 5,
width: 150,
textAlign: 'center',
},
buttonText: {
color: 'black',
fontSize: 25,
fontWeight: 'bold',
textAlign: 'center',
}
});