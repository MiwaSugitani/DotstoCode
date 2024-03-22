import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc } from "firebase/firestore";
import db from "./firebase";

export default function YesScreen({ route }) {
  // Today_DetailScreen から渡されたパラメータを取得
  const navigation = useNavigation();
  const { month, day, dayOfWeek, yarukoto,id} = route.params;

  // おばあちゃんが選択されたときの処理
//const handleGrandmaPress = () => {
    // おばあちゃんが選択されたことを親画面に伝えるなどの処理をここに追加
    //navigation.goBack();
  //  saveDataToFirebase("おばあちゃん");
  //};

  // おじいちゃんが選択されたときの処理
  //const handleGrandpaPress = () => {
    // おじいちゃんが選択されたことを親画面に伝えるなどの処理をここに追加
    //navigation.goBack();
    //saveDataToFirebase("おじいちゃん");
  //};
  
  const handlePress = async (who) => {
    console.log("handlePress function called with parameter:", who);
    try {
        console.log("Document ID:", id); // ここでidの値をログ出力
        if (!id) {
          console.error("ID is undefined or not valid."); // idがundefinedまたは無効な場合のエラーログ
          return; // idが不正な場合は処理を中断
        }
        const docRef = doc(db, 'posts', id);
        const dataToUpdate = {
          who: who // 更新するフィールドと値
        };
    await updateDoc(docRef, dataToUpdate);
    navigation.navigate('今日のやること', { who }); // 今日の画面に遷移して、whoの値を渡す
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`${month}月${day}日${dayOfWeek}の\nやること`}</Text>
      <View style={styles.taskDetailContainer}>
      <Text style={styles.detailText}>{`${yarukoto}`}</Text>
      </View>
      <Text style={styles.footerText}>{`誰がしましたか`}</Text>
      <TouchableOpacity style={[styles.button, styles.grandmaButton]} onPress={() => handlePress("おばあちゃん")}>
          <Text style={styles.buttonText}>おばあちゃん</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.grandpaButton]} onPress={() => handlePress("おじいちゃん")}>
          <Text style={styles.buttonText}>おじいちゃん</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE073',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      detailText: {
        fontSize: 40,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      footerText: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'center',
      },
      button: {
        width: 300,
        paddingVertical: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center', // 中央揃え
        justifyContent: 'center',
      },
      grandmaButton: {
        backgroundColor: '#ff8f9f',
      },
      grandpaButton: {
        backgroundColor: '#76dae3',
      },
      buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      taskDetailContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: 400,
        marginBottom: 25,
      },
});
