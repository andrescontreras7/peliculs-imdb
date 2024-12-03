import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Pelicula {
  id: string;
  titulo: string;
  imagen: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const Peliculas: React.FC<{ data: Pelicula[] }> = ({ data }) => {
  const baseURL = 'https://image.tmdb.org/t/p/w500';
  const navigation = useNavigation();

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay películas disponibles</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Peliculas', { id: item.id })}
            style={styles.pressable}
          >
            <View style={styles.peliculaContainer}>
              <Image
                source={{ uri: `${baseURL}${item.poster_path}` }}
                style={styles.imagen}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.titulo}>{item.title}</Text>
                <Text style={styles.detalle}>Rating: {item.vote_average}</Text>
                <Text style={styles.detalle}>Fecha: {item.release_date}</Text>
              </View>
            </View>
          </Pressable>
        )}
        keyExtractor={pelicula => pelicula.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  pressable: {
    marginHorizontal: 5,
  },
  peliculaContainer: {
    margin: 10,
    display: 'flex',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    height: 250,
    width: 160,
    elevation: 3,
    backgroundColor: 'white',
  },
  imagen: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  detalle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Peliculas;