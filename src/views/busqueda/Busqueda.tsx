import React,{useState, useEffect} from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import ItemsBusqueda from './ItemsBusqueda';
import createAxiosInstance from '../../helpers/axios-client/axiosClient';

const Busqueda = () => {
    const [busqueda, setBusqueda] = useState([])




    const hanledChange = (text:string) => {
        if(text.length>0){
            searchPelicula(text)
        }
        if(text.length === 0){
            searchPelicula('')
        }

     
        
    }

    const searchPelicula = async (busqueda:string) => {
      try {
        const AxiosIntance = createAxiosInstance(`search/movie?query=${busqueda}`)
       await AxiosIntance.get()
        .then( response => {
            setBusqueda(response.data.results)
        })
        
        
      } catch (error) {
        console.log(error)
        
      }

    }

    useEffect(() => {
    
    }, []);
   
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar películas..."
                onChangeText={(text) => {
                    hanledChange(text)
                }}
            />
           
         <ItemsBusqueda busqueda={busqueda}  />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        backgroundColor : '#f2f2f2',
        borderRadius: 10,
       
        marginBottom: 12,
        paddingHorizontal: 8,
    },
   
   
});

export default Busqueda;
