import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//作成したscreensファイルをインポートしていく
import HomeScreen from './screens/home';
import TodayScreen from './screens/today';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
            height: 150, // ヘッダーの高さを調整する
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 35, // ヘッダータイトルのフォントサイズを調整する
          },
        }}
      >
        <Stack.Screen
          name="ホーム画面"
          component={HomeScreen}
          options={{ title: 'ホーム画面' }}
        />
        <Stack.Screen
          name="今日のやること"
          component={TodayScreen}
          options={{ title: '今日のやること' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
    borderRadius: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
