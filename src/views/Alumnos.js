import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

const Alumnos = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Alumnos</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },

  titulo: {
    marginTop: 10,
    fontSize: 30,
  },
});

export default Alumnos;
