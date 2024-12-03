import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useReducer, useState } from 'react';
import { Alert } from 'react-native';
import { PeliculaData } from '../types/peliculas.type';

type Action =
  | { type: 'ADD'; path: PeliculaData }
  | { type: 'REMOVE'; path: string }
  | { type: 'SET'; payload: PeliculaData[] };

interface State {
  valor: PeliculaData[];
}

const initialState: State = {
  valor: [],
};

// Función para leer los datos existentes
const read = async (): Promise<PeliculaData[]> => {
  try {
    const data = await AsyncStorage.getItem('data');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

const clearData = async () => {
  await AsyncStorage.clear();
  Alert.alert('Alerta', 'Se vació la lista de seguimientos');
};

const update = async (lista: PeliculaData[]) => {
  try {
    await AsyncStorage.setItem('data', JSON.stringify(lista));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD':
      return { ...state, valor: [...state.valor, action.path] };

    case 'REMOVE':
      return { ...state, valor: state.valor.filter(item => item.id !== action.path) };

    case 'SET':
      return { ...state, valor: action.payload };

    default:
      return state;
  }
};

const useCustomHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [initialLoad, setInitialLoad] = useState(true);

  const storeData = async () => {
    if (state.valor) {
      try {
        await update(state.valor);
        Alert.alert('Éxito', 'Se guardaron los datos correctamente');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Ocurrió un error al guardar los datos');
      }
    }
  };

  const loadData = async () => {
    const list = await read();
    dispatch({ type: 'SET', payload: list });
    setInitialLoad(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      storeData();
    }
  }, [state.valor]);

  return { state, dispatch, clearData };
};

export default useCustomHook;