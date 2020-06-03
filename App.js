import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView  } from 'react-native';
import { Meteo } from "./Composants/composant.js"


export default function App() {
  return (
    <ScrollView  style={styles.container}>
      <Text><Meteo/></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width : "90%",
    marginTop : 25,
    marginLeft : 'auto',
    marginRight : 'auto',
  },
  test: {
    color : "red",
  },
});



const test = ["none","block","inline-block"];
