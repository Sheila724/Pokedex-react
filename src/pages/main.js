import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Main = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [pokemons, setPokemons] = useState([]);

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handleSearch = (text) => {
    const filteredPokemons = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(text.toLowerCase())
    );
    setPokemons(filteredPokemons);
  };

  const handleMyList = () => {
    navigation.navigate("MyList");
  };

  const handleFavorites = () => {
    navigation.navigate("MyList");
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

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const detailsResponse = await fetch(pokemon.url);
            const details = await detailsResponse.json();
            return { 
              id: index + 1,
              name: pokemon.name, 
              image: details.sprites.other['official-artwork'].front_default,
              types: details.types.map(type => type.type.name)
            };
          })
        );

        setPokemons(detailedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemons();
  }, []);

  const renderPokemonItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.pokemonCard}
      onPress={() => navigation.navigate("Details", { pokemon: item })}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.pokemonImage} 
        resizeMode="contain"
      />
      <Text style={styles.pokemonNumber}>#{item.id.toString().padStart(3, '0')}</Text>
      <Text style={styles.pokemonName}>{item.name}</Text>
      <View style={styles.typesContainer}>
        {item.types.map(type => (
          <Text key={type} style={styles.pokemonType}>{type}</Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/Pokemon-Simbolo.png')}
          style={{ width: 80, height: 60, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="exit-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>
        Procure por um Pokémon
      </Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Digite o nome do Pokémon"
        placeholderTextColor="#666"
        onChangeText={handleSearch}
      />

      {/* Pokémon Grid */}
      <FlatList
        data={pokemons}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.pokemonCard} onPress={() => navigation.navigate("Details", { pokemon: item })}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.pokemonImage} 
              resizeMode="contain"
            />
            <Text style={styles.pokemonNumber}>#{item.id.toString().padStart(3, '0')}</Text>
            <Text style={styles.pokemonName}>{item.name}</Text>
            <View style={styles.typesContainer}>
              {item.types.map(type => (
                <Text key={type} style={styles.pokemonType}>{type}</Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.scrollContainer}
      />

      {/* Botão de Sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>

      <View style={styles.footerButtons}>
        <TouchableOpacity style={styles.footerButton} onPress={handleMyList}>
          <Text style={styles.footerButtonText}>Minha Pokédex</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  pokemonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  pokemonNumber: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
    marginBottom: 8,
    textAlign: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pokemonType: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#3b4cca',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 2,
    textTransform: 'capitalize',
  },
  favoritesButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'transparent', // Removida a cor de fundo
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: 'transparent', // Removida a cor de fundo
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  footerButtons: {
    flexDirection: 'column', // Alterado para exibir os botões em uma coluna
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: {
    width: '100%', // Ajustado para ocupar quase toda a largura
    alignItems: 'center',
    padding: 12,
    marginVertical: 8, // Alterado para espaçamento vertical
    backgroundColor: '#3b4cca',
    borderRadius: 8,
  },
  footerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  exitButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    backgroundColor: '#3b4cca',
    padding: 12,
    borderRadius: 8,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Main;