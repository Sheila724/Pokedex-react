import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ pokemon }) => {
  if (!pokemon || typeof pokemon !== 'object' || !pokemon.name) return null;
  
  const navigation = useNavigation();
  const handleDetails = () => {
    navigation.navigate("Details", { pokemon });
  }

  // Extrai o ID do Pokémon da URL para obter a imagem
  const getIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
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

  const pokemonId = pokemon.url ? getIdFromUrl(pokemon.url) : pokemon.id;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  const backgroundColor = getBackgroundColorByType(pokemon.type);

  return (
    <TouchableOpacity onPress={handleDetails} style={[styles.card, { backgroundColor }]}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 150, height: 150, borderRadius: 8, marginBottom: 10 }}
      />
      <Text style={styles.cardText}>{pokemon.name}</Text>
      <Text style={styles.cardText}>Nº {pokemonId}</Text>

      <TouchableOpacity style={styles.buttonDetails} onPress={handleDetails}>
        <Text style={styles.textButton} numberOfLines={1} ellipsizeMode="tail">Detalhes</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cardText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  buttonDetails: {
    maxWidth: 200,
    backgroundColor:"#fff",
    padding: 10,
    paddingHorizontal:0,
    borderRadius: 5,
    margin: 10
  },
  textButton: {
    color: "#b31515",
    paddingHorizontal: 30
  }
});

export default Card;
