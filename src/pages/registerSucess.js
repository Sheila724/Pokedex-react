import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

const RegisterSucess = () => {

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>

      <View style={styles.containerTop}>
        <View>
          <Image
            source={require('../../assets/image.png')}
            style={{ width: 166.15, height: 45 }} />
        </View>

        <View style={styles.body}>
          <Text style={styles.textSecond}>Cadastro realizado com sucesso</Text>

          <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
            <Text style={styles.button}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  containerTop: {
    paddingTop: 85,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: "start",
    justifyContent: "center",
    gap: 20
  },
  textSecond: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 50,
    fontSize: 20
  },
  buttonEntrar: {
    backgroundColor: "#e50914",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  button: {
    fontSize: 20,
    color: "#fff"
  },
});

export default RegisterSucess;
