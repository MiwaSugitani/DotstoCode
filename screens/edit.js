import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';

export default function EditScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
            やりたいことを選んでください
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('やることを追加')}
      >
        <Text style={styles.buttonText}>やることを追加</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('やることを変更')}
      >
        <Text style={styles.buttonText}>やることを変更</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('やることを消去')}
      >
        <Text style={styles.buttonText}>やることを消去</Text>
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
  button: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 10,
    width: 350,
  },
  buttonText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});
