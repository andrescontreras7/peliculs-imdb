import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Pressable,
  View,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VsLista from './Lista/VsLista';
import useCustomHook from '../helpers/hooks/useLista';

function Home() {
  const [data, setData] = useState([]);
  const { clearData } = useCustomHook();

  const getStorage = async () => {
    const valor = await AsyncStorage.getItem('data');
    let newValor = JSON.parse(valor);
    setData(newValor);
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#F6C700" barStyle="dark-content" />
      <View style={styles.containerPrincipal}>
        <Pressable style={styles.button} onPress={clearData}>
          <Text style={styles.buttonText}>Vaciar mi lista</Text>
        </Pressable>
        <VsLista data={data} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerPrincipal: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#F6C700',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;