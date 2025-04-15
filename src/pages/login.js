import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await AsyncStorage.getItem("user")
    if (!user) {
      alert("No registered users!")
      return
    }
    const userJson = JSON.parse(user)
    if (userJson.email === email && userJson.password === password) {
      navigation.navigate("Main")
    } else {
      alert("Invalid email or password!")
    }
  };

  const handlerCodden = () => {
    alert("Serviço fora do ar. Tente novamente mais tarde!")
  }

  const handleRegister = () => {
    navigation.navigate("RegisterUser")
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View>
          <Image
            source={require('../../assets/Pokemon-Simbolo.png')}
            style={{ width: 280, height: 90}} />
        </View>

        <Text style={styles.text}>Entrar</Text>
        <View style={styles.body}>

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#888" />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#888" />

          <View style={styles.buttonInput}>

            <TouchableOpacity style={styles.buttonEntrar} onPress={handleLogin}>
              <Text style={styles.button}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCodigo} onPress={handleRegister}>
              <Text style={styles.button}>Cadastre-se</Text>
            </TouchableOpacity>

            <Text style={styles.textDefault}>Esqueceu a senha?</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BF0404",
  },
  containerTop: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    gap: 50
  },
  body: {
    flex: 1,
    alignItems: "center",
    gap: 20

  },
  buttonInput: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: "#ffff",
    fontSize: 40,
    fontWeight: 500,

  },
  textSecond: {
    color: "#fff",
    textAlign: "center",
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 12,
    width: "100%",
    backgroundColor: "#fff",
    color: "#000", // Alterado para preto
    placeholderTextColor: "#000" // Alterado para preto
  },
  buttonEntrar: {
    backgroundColor: "#0477BF",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,

  },
  buttonCodigo: {
    backgroundColor: "#0477BF",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  button: {
    fontSize: 20,
    color: "#fff"
  },
  textDefault: {
    color: "#fff",
    textAlign: "center",
    margin: 10,
    textDecorationLine: "underline"
  },
  cadastro: {
    color: "#fff",
    textAlign: "center",
    fontSize: 10,
    margin: 20
  },
  cadastroUP: {
    fontWeight: 500
  }
});

export default Login;
