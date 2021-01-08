import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  superior: {
    flex: 80,
    padding: 10,
    alignItems: "flex-start",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#8c85ff"
  },
  titulo: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold"
  },
  descripcion: {
    color: "white",
    fontSize: 18
  }
});

//Componente de la parte superior
const Superior = ({ item }) => (
  <View style={styles.superior}>
    <Text style={styles.titulo}>{item.nombre}</Text>
    <Text style={styles.descripcion}>{item.descripcion}</Text>
  </View>
);

export default Superior;
