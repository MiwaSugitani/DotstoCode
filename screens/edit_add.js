import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import * as React from 'react';

export default function Edit_AddScreen({ navigation }) {
  const [dataSet, setDataSet] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const addToDataSet = (value) => {
    // 新しいデータオブジェクトを作成し、データセットに追加する
    setDataSet([...dataSet, { day: value, task: inputValue }]);
    setInputValue('');
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
        onPress={() => addToDataSet(inputValue)}
      >
        <Text style={styles.buttonText}>追加</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('月')}
      >
        <Text style={styles.buttonText}>月</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('火')}
      >
        <Text style={styles.buttonText}>火</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('水')}
      >
        <Text style={styles.buttonText}>水</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('木')}
      >
        <Text style={styles.buttonText}>木</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('金')}
      >
        <Text style={styles.buttonText}>金</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('土')}
      >
        <Text style={styles.buttonText}>土</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('日')}
      >
        <Text style={styles.buttonText}>日</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('その他')}
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