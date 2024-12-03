import React, { useCallback, useState } from 'react';
import Nav from '../components/nav';
import type { PropsWithChildren } from 'react';
import Section from '../components/section';

import { NavigationContainer } from '@react-navigation/native';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Peliculas from '../components/CMTpeliculas';
import useCustomHook from '../helpers/hooks/useLista';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import createAxiosInstance from '../helpers/axios-client/axiosClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PeliculaData } from '../helpers/types/peliculas.type';
import { supabase } from '../supabase/supabase';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Home() {
  const { dispatch } = useCustomHook();
  const [dataTop, setDataTop] = React.useState<PeliculaData[]>([]);
  const [dataLista, setDataLista] = useState<PeliculaData[]>([]); // Para las películas en la lista de seguimiento
  const [storage, setStorage] = useState(false);
  const navigation = useNavigation();

  const Consulta = async () => {
    // Obtener las películas guardadas en la lista de seguimiento
    const local = await AsyncStorage.getItem('data');
    if (local?.length > 0) {
      setStorage(true);
      setDataLista(JSON.parse(local)); // Cargar las películas de la lista de seguimiento
    } else {
      setStorage(false);
    }

    // Obtener las películas top
    const axiosInstance = createAxiosInstance('movie/top_rated');
    axiosInstance
      .get()
      .then((response) => {
        setDataTop(response.data.results); // Cargar las películas del top
      })
      .catch((error) => {
        console.error('Error fetching top rated movies:', error);
      });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    } else {
      await AsyncStorage.clear(); 
      navigation.replace('Login'); 
    }
  };

  useFocusEffect(
    useCallback(() => {
      Consulta();
    }, [])
  );

  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <StatusBar backgroundColor="#F6C700" barStyle="light-content" />
      <View style={styles.header}>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Section />
        <View style={styles.sectionDescription}>
          <View style={styles.texto}>
            <Text style={styles.text2}>Mi lista</Text>
          </View>
          <Peliculas data={dataLista} />
        </View>
        <View style={styles.sectionDescription}>
          <View style={styles.texto}>
            <Text style={styles.text2}>Películas más valoradas</Text>
          </View>
          <Peliculas data={dataTop} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  sectionDescription: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  texto: {
    borderColor: 'yellow',
    display: 'flex',
    borderLeftColor: '#F6C700',
    borderLeftWidth: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#F6C700',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Home;
