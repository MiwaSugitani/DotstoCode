import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Today_DetailScreen({ route }) {
  const navigation = useNavigation();
  // const { taskId } = route.params;// タスクIDを取得
  const {id, yarukoto, year, month, day, dayOfWeek} = route.params; // タスク名を取得
  

  // はいのボタンをタップした際の処理を記述
  const handleYesPress = () => {
    navigation.navigate('はい', {
      id: id, 
      yarukoto: yarukoto,
      year: year,
      month: month,
      day: day,
      dayOfWeek: dayOfWeek,
    });
  };
  // 今日はやらないボタンをタップした際の処理を記述
  const handleYaranaiPress = () => {
    navigation.navigate('今日はやらない');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { fontSize: 40 , textAlign: 'center' }]}>
      {`${month}月${day}日${dayOfWeek}の\nやること`}
      </Text>
      <View style={styles.taskDetailContainer}>
      <Text style={styles.taskDetail}>{yarukoto}</Text>
      </View>
      <Text style={styles.questionText}>できましたか</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleYesPress}>
          <Text style={styles.buttonText}>はい</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>いいえ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleYaranaiPress}>
          <Text style={styles.buttonText}>今日はやらない</Text>
        </TouchableOpacity>
      </View>
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
  taskDetail: {
    fontSize: 50,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 40,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 50,
    borderRadius: 10,
    width: 250,
    backgroundColor: 'pink',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24, // フォントサイズを大きくする
    textAlign: 'center', // 中央揃えにする
  },
  taskDetailContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 400,
    marginBottom: 25,
  },
  taskDetail: {
    fontSize: 50,
    textAlign: 'center',
  },
});
