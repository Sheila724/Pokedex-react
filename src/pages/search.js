import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "../services/config.axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";

const Search = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPokemon = async (query) => {
    if (!query.trim()) {
      Alert.alert('Por favor, digite o nome ou número do Pokémon');
      return;
    }

    try {
      setLoading(true);
      
      // Busca por nome ou ID
      const response = await auth.get(`pokemon/${query.toLowerCase()}`);
      
      const pokemonData = {
        id: response.data.id,
        name: response.data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`,
        details: response.data
      };

      setSearchResults([pokemonData]);
    } catch (error) {
      Alert.alert('Pokémon não encontrado');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const searchAllPokemon = async () => {
    try {
      setLoading(true);
      const response = await auth.get('pokemon?limit=1000');
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching Pokémon list:", error);
    } finally {
      setLoading(false);
    }
  };

  const savedInfo = async (pokemon) => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userObj = user ? JSON.parse(user) : {};

      // Verifica se o Pokémon já está na lista
      const isAlreadySaved = userObj.pokemons?.some(
        p => p.id === pokemon.id || p.name === pokemon.name
      );

      if (isAlreadySaved) {
        Alert.alert("Este Pokémon já está na sua lista!");
        return;
      }

      const updatedUser = {
        ...userObj,
        pokemons: [...(userObj.pokemons || []), pokemon]
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      Alert.alert("Pokémon adicionado à lista!", pokemon.name);
    } catch (error) {
      console.error("Erro ao salvar dados no AsyncStorage:", error);
    }
  };

  const handleMain = () => {
    navigation.navigate("Main");
  };

  const handleMyList = () => {
    navigation.navigate("MyList");
  };

  return (
    <View style={styles.body}>
      <Text style={styles.textPrimary}>Qual Pokémon procura?</Text>
      
      <TextInput 
        style={styles.textinput}
        value={value}
        onChangeText={setValue}
        placeholder="Digite o nome ou número do Pokémon"
        placeholderTextColor="#888"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.buttonAdd} 
          onPress={() => searchPokemon(value)}
          disabled={loading}
        >
          <Text style={styles.button}>
            {loading ? 'Buscando...' : 'Buscar Pokémon'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buttonAdd} 
          onPress={searchAllPokemon}
          disabled={loading}
        >
          <Text style={styles.button}>
            {loading ? 'Carregando...' : 'Ver Todos Pokémon'}
          </Text>
        </TouchableOpacity>
      </View>

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.pokemonItem}>
              <Card pokemon={item} />
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => savedInfo(item)}
              >
                <Text style={styles.saveButtonText}>Salvar Pokémon</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.list}
        />
      )}

      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.buttonRed} onPress={handleMyList}>
          <Text style={styles.button}>Ir para minha Pokédex</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonBack} onPress={handleMain}>
          <Text style={styles.button}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  textPrimary: {
    color: "#fff",
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
  },
  textinput: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonAdd: {
    backgroundColor: "#e50914",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonRed: {
    backgroundColor: "#3b4cca",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  button: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonBack: {
    backgroundColor: "#272727",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  navButtons: {
    width: '100%',
    marginTop: 20,
  },
  list: {
    width: '100%',
    marginVertical: 10,
  },
  pokemonItem: {
    marginBottom: 20,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#ffcc00',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Search;


