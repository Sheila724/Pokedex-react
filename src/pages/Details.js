import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import auth from "../services/config.axios";

const Details = () => {
  const route = useRoute();
  const { pokemon: initialPokemon } = route.params;
  const navigation = useNavigation();
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [loading, setLoading] = useState(!initialPokemon.details);
  const [user, setUser] = useState(null);
  const isFromMyList = route.params?.fromMyList;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!initialPokemon.details) {
        try {
          setLoading(true);
          const response = await auth.get(`pokemon/${initialPokemon.name || initialPokemon.id}`);
          setPokemon({
            ...initialPokemon,
            details: response.data
          });
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchPokemonDetails();
    fetchUser();
  }, [initialPokemon]);

  const handleMylist = () => {
    navigation.navigate("MyList");
  }

  const handleDeletePokemon = async () => {
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

  const handleSavePokemon = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        const updatedPokemons = [...parsedUser.pokemons, pokemon];

        const updatedUser = { ...parsedUser, pokemons: updatedPokemons };

        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

        Alert.alert("Pokémon adicionado a Pokedex");
      }
    } catch (error) {
      console.error("Erro ao salvar o Pokémon na Pokedex:", error);
    }
  };

  const handleBackToMain = () => {
    navigation.navigate("Main");
  };

  const getBackgroundColorByType = (type) => {
    const colors = {
      grass: '#A8E6A1',
      fire: '#F5AC78',
      water: '#9DB7F5',
      electric: '#F7E876',
      bug: '#C6D16E',
      normal: '#C6C6A7',
      poison: '#C183C1',
      ground: '#EBD69D',
      flying: '#C6B7F5',
      psychic: '#FA92B2',
      rock: '#D1C17D',
      ice: '#BCE6E6',
      ghost: '#A292BC',
      dragon: '#A27DFA',
      dark: '#A29288',
      steel: '#D1D1E0',
      fairy: '#F4BDC9'
    };
    return colors[type] || '#FFFFFF';
  };

  if (loading) {
    return (
      <View style={styles.body}>
        <Text style={styles.textPrimary}>Carregando...</Text>
      </View>
    );
  }

  const isFavorite = user?.pokemons?.some((p) => p.id === pokemon.id);
  const backgroundColor = getBackgroundColorByType(pokemon.details.types[0].type.name);

  return (
    <ScrollView style={[styles.body, { backgroundColor }]}>
      <TouchableOpacity style={styles.backArrow} onPress={handleBackToMain}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.textPrimary}>Sobre o Pokémon</Text>

      <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 20 }}>
        <Image
          source={{ uri: pokemon.details.sprites.other['official-artwork'].front_default }}
          style={{
            width: 180,
            height: 180,
            borderRadius: 8,
            marginBottom: 10
          }}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.cardText}>Nome: {pokemon.details.name}</Text>
        <Text style={styles.cardText}>Nº {pokemon.details.id}</Text>
        <Text style={styles.cardText}>Altura: {pokemon.details.height / 10}m</Text>
        <Text style={styles.cardText}>Peso: {pokemon.details.weight / 10}kg</Text>
        <Text style={styles.cardText}>
          Tipos: {pokemon.details.types.map(t => t.type.name).join(', ')}
        </Text>
        <Text style={styles.cardText}>
          Habilidades: {pokemon.details.abilities.map(a => a.ability.name).join(', ')}
        </Text>
      </View>

      <TouchableOpacity style={styles.buttonEx} onPress={handleSavePokemon}>
        <Text style={styles.button}>Adicionar a Pokedexr</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBack} onPress={handleDeletePokemon}>
        <Text style={styles.button}>Excluir da Pokedex</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 100,
  },
  content: {
    flex: 1,
    marginLeft: 50,
    marginBottom: 30,
  },
  textPrimary: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center"
  },
  cardText: {
    color: "#808080", // Alterado para cinza
    textAlign: "left",
    marginTop: 5,
    fontSize: 18,
    paddingBottom: 5
  },
  buttonBack: {
    backgroundColor: "#e50914",
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
  buttonEx: {
    backgroundColor: "#272727",
    borderRadius: 5,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  backArrow: {
    position: 'absolute',
    top: 10,
    left: 3,
    zIndex: 1,
  },
});

export default Details;
