// やることの編集画面 (EditScreen.js)
import { StyleSheet, View, Text } from 'react-native';
import * as React from 'react';

export default function EditScreen() {
  return(
    <View style={styles.container}>
      <Text>やることの編集画面</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
