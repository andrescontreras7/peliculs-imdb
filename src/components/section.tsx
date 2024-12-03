import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar, ActivityIndicator } from 'react-native';
import createAxiosInstance from '../helpers/axios-client/axiosClient';

const Section: React.FC = () => {
  const [movie, setMovie] = useState<any>(null);

  const fetchRandomMovie = async () => {
    try {
      const axiosInstance = createAxiosInstance('movie/popular');
      const response = await axiosInstance.get();
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    } catch (error) {
      console.error('Error fetching random movie:', error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F6C700" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6C700" barStyle="light-content" />
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }}
        style={styles.content}
      >
        <View style={styles.overlay} />
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.portada}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 430,
    display: 'flex',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  overview: {
    fontSize: 14,
    color: 'white',
  },
  portada: {
    backgroundColor: 'darkgray',
    height: 170,
    width: 120,
    marginRight: 10,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 100,
    gap: 10,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
});

export default Section;