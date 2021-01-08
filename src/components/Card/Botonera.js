import React from "react";
import { View, StyleSheet, Alert } from "react-native";

import Link from "../Link";

const styles = StyleSheet.create({
  inferior: {
    flex: 20,
    padding: 10,
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row"
  }
});

//Botonera de la targeta
const Botonera = ({ eliminar, actualizar }) => {
  return (
    <View style={styles.inferior}>
      <Link
        onPress={() => {
          actualizar();
        }}
        label="actualizar"
        colorFont="white"
      />
      <Link
        onPress={() => {
          eliminar();
        }}
        label="eliminar"
        colorFont="white"
      />
    </View>
  );
};

export default Botonera;
