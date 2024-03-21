import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//作成したscreensファイルをインポートしていく
import HomeScreen from './screens/home';
import TodayScreen from './screens/today';
import Other_TodayScreen from './screens/other_today.js';
import EditScreen from './screens/edit';
import Today_DetailScreen from './screens/today_detail.js';
import OtherdayScreen from './screens/otherday.js'

import Edit_AddScreen from './screens/edit_add.js';
import Edit_ChangeScreen from './screens/edit_change.js';
import Edit_DeleteScreen from './screens/edit_delete.js';

import YesScreen from './screens/yes.js';
import YaranaiScreen from './screens/yaranai.js';
import OKScreen from './screens/ok.js';
import OKOtherdayScreen from './screens/ok_otherday.js';
import Today_Detail_OtherdayScreen from './screens/today_detail_otherday.js';
import YesOtherdayScreen from './screens/yes_otherday.js';
import YaranaiOtherdayScreen from './screens/yaranai_otherday.js';
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
        <Stack.Screen
          name="今日以外のやること"
          component={Other_TodayScreen}
          options={{ title: '今日以外のやること' }}
        />
        <Stack.Screen
          name="やることの編集"
          component={EditScreen}
          options={{ title: 'やることの編集' }}
        />
        <Stack.Screen
          name="今日の詳細"
          component={Today_DetailScreen}
          options={{ title: '今日の詳細' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="やることを追加"
          component={Edit_AddScreen}
          options={{ title: 'やることを追加' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="やることを変更"
          component={Edit_ChangeScreen}
          options={{ title: 'やることを変更' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="やることを消去"
          component={Edit_DeleteScreen}
          options={{ title: 'やることを消去' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="OtherdayScreen"
          component={OtherdayScreen}
          options={{ title: '今日以外のやること画面' }}
        />
        <Stack.Screen
          name="はい"
          component={YesScreen}
          options={{ title: 'はい' }} // 任意のタイトルを設定
          initialParams={{}}
        />
        <Stack.Screen
          name="今日はやらない"
          component={YaranaiScreen}
          options={{ title: '今日はやらない' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="完了画面"
          component={OKScreen}
          options={{ title: '完了画面' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="完了今日以外画面"
          component={OKOtherdayScreen}
          options={{ title: '完了今日以外画面' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="今日以外詳細画面"
          component={Today_Detail_OtherdayScreen}
          options={{ title: '今日以外詳細画面' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="今日以外はい"
          component={YesOtherdayScreen}
          options={{ title: '今日以外はい' }} // 任意のタイトルを設定
        />
        <Stack.Screen
          name="今日以外やらない"
          component={YaranaiOtherdayScreen}
          options={{ title: '今日以外やらない' }} // 任意のタイトルを設定
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
