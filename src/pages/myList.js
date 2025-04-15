import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";

const MyList = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const handlerMain = () => {
    navigation.navigate("Main");
  };

  const handleDeletePokemon = async (pokemon) => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        const updatedPokemons = parsedUser.pokemons.filter(
          (p) => p.id !== pokemon.id && p.name !== pokemon.name
        );

        const updatedUser = { ...parsedUser, pokemons: updatedPokemons };

        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

        Alert.alert("Pokémon removido");
        navigation.navigate("MyList");
      }
    } catch (error) {
      console.error("Erro ao remover o Pokémon:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.body}>
      <Text style={styles.textPrimary}>Pokédex</Text>

      {!user?.pokemons || user.pokemons.length === 0 ? (
        <View style={styles.content}>
          <Image
            source={require('../../assets/avatar.jpeg')}
            style={{ width: 172, height: 172 }}
          />
          <Text style={styles.textSecond}>Sua Pokédex está vazia</Text>
          <Text style={styles.textSecond}>Capture alguns Pokémon!</Text>

          <TouchableOpacity style={styles.buttonBack} onPress={handlerMain}>
            <Text style={styles.button}>Voltar</Text>
          </TouchableOpacity>

        </View>
      ) : (
        <FlatList
          data={user.pokemons}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <Card pokemon={item} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.scrollContainer}
          ListFooterComponent={
            <View>
              <TouchableOpacity style={styles.buttonBack} onPress={handlerMain}>
                <Text style={styles.button}>Voltar</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 50,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  textPrimary: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textSecond: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  buttonBack: {
    backgroundColor: "#3b4cca",
    borderRadius: 10,
    padding: 15,
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },
  button: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 15,
  },
  buttonEx: {
    backgroundColor: "#ff0000",
    borderRadius: 10,
    padding: 15,
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default MyList;