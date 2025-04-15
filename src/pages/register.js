import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from "react-native";

export default class RegisterUser extends Component {
  state = {
    user: "",
    email: "",
    password: "",
    confirmedPassword: "",
    
  };

  handleCadastro = async () => {
    const { user, email, password, confirmedPassword } = this.state;

    if (!user || !email || !password || !confirmedPassword) {
      alert("Preencha todos os campos!");
      return;
    }

    if (password !== confirmedPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const data = {
        user,
        email,
        password,
        confirmedPassword
      };
      await AsyncStorage.setItem("user", JSON.stringify(data));
      this.props.navigation.navigate("RegisterSucess");
    } catch (error) {
      console.error("Erro ao salvar os dados do usuário:", error);
      alert("Ocorreu um erro ao tentar cadastrar. Tente novamente mais tarde!");
    }
  };

  handlerHome = ()=> {
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
            source={require('../../assets/Pokemon-Simbolo.png')}
            style={{ width: 300, height: 120 }} />

        <Text style={styles.text}>Cadastre-se</Text>
        <View style={{ height: 20 }} />
        <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={this.state.user}
          onChangeText={(user) => this.setState({ user })}
          placeholderTextColor="#888"
        />
          <TextInput
          style={styles.input}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholderTextColor="#888"
        />
          <TextInput
          style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          placeholderTextColor="#888"
        />
          <TextInput
          style={styles.input}
          placeholder="Confirme a senha"
          secureTextEntry={true}
          value={this.state.confirmedPassword}
          onChangeText={(confirmedPassword) => this.setState({ confirmedPassword })}
          placeholderTextColor="#888"
        />
        
        <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonvoltar} onPress={this.handlerHome }>
        <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0477BF",
    paddingTop: "85",
    paddingLeft: "30",
    paddingRight: "30",
    gap:30
  },
  body:{
    flex: 1,
    gap: 10
  },
  text: {
    color: "#ffff",
    fontSize: 30,
    fontWeight: 600,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 8,
    width: "100%",
    backgroundColor: "#fff",
    color: "#000", // Alterado para preto
    placeholderTextColor: "#000" // Alterado para preto
  },
  button: {
    backgroundColor: "#BF0404",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff"
  },
  buttonvoltar: {
    backgroundColor: "#BF0404",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
});
