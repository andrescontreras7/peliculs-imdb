import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import createAxiosInstance from '../../helpers/axios-client/axiosClient';
import { ImageUrl } from '../../helpers/axios-client/bse';
import { PeliculaData } from '../../helpers/types/peliculas.type';
import styles from './style';
import useCustomHook from '../../helpers/hooks/useLista';

const Peliculas: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: string };
  const [data, setData] = useState<PeliculaData | null>(null);
  const { dispatch, state } = useCustomHook();
  const isMovieInList = state.valor.some((item) => item.id === id);

  const getMovies = async () => {
    const axiosInstance = createAxiosInstance(`movie/${id}`);
    axiosInstance
      .get()
      .then(response => {
        setData(response.data);
        navigation.setOptions({ title: response.data.title });
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  };

  useEffect(() => {
    getMovies();
  }, [id]);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
      </View>
      <Image source={{ uri: `${ImageUrl}/${data.backdrop_path}` }} style={styles.image} />
      <Text style={styles.overview}>{data.overview}</Text>
      <View style={styles.details}>
        <Text style={styles.detailText}>Fecha de lanzamiento: {data.release_date}</Text>
        <Text style={styles.detailText}>Puntuación: {data.vote_average}</Text>
        <Text style={styles.detailText}>Votos: {data.vote_count}</Text>
        <Text style={styles.detailText}>Duración: {data.runtime} minutos</Text>
        <Text style={styles.detailText}>Géneros: {data.genres.map(genre => genre.name).join(', ')}</Text>
      </View>
      <Pressable
        style={styles.boton}
        onPress={() => {
          if (isMovieInList) {
            dispatch({ type: 'REMOVE', path: data.id });
          } else {
            dispatch({ type: 'ADD', path: data });
          }
        }}
      >
        <Text style={styles.TextBoton}>
          {isMovieInList ? 'Eliminar de la lista de seguimientos' : 'Agregar a mi lista de seguimientos'}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Peliculas;