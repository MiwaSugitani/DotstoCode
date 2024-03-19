import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Today_DetailScreen({ route }) {
  const navigation = useNavigation();
  // const { taskId } = route.params;// タスクIDを取得
  const { taskName } = route.params; // タスク名を取得

  return (
    <View style={styles.container}>
      <Text style={styles.taskDetail}>{taskName}</Text>
      <Text style={styles.questionText}>できましたか</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text>はい</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text>いいえ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text>今日はやらない</Text>
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
    fontSize: 24,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'pink',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
