import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as React from 'react';

export default function Edit_ChangeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24 }}>変更するやることを押す</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('やることを変更')}
        >
          <Text style={styles.buttonText}>やることを変更</Text>
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
    },
  });