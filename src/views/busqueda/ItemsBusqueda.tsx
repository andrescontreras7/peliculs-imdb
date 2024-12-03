import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ItemsBusqueda = ({ busqueda }:any) => {
    const navigation = useNavigation()
    const baseURL = 'https://image.tmdb.org/t/p/w500';
  return (
    <View style={styles.container}>
    {busqueda.length>0 ? (
         
      <FlatList
      data={busqueda}
      renderItem={({ item }) => (
        <Pressable
        onPress={() => navigation.navigate('Peliculas', { id: item.id })}
        style={styles.item}>
          <View style={styles.cards}>
            <Image
              source={{ uri: `${baseURL}${item.poster_path}` }}
              style={styles.imagen}
            />
          </View>
          <View style={styles.cardsInfo}>
            <Text>{item.title}</Text>
          </View>
        </Pressable>
      )}
      keyExtractor={item => item.id.toString()}
    />
    ) :  (
        <View>
            <Text>Empieza a buscar pa</Text>
        </View>
    )}

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    borderColor: 'gray',
    backgroundColor : '#f2f2f2',
    borderRadius: 10,
    
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',

  },
  item: {

    height: 200,
    width:'100%',
    marginBottom:10,
    gap:10,
    flexDirection: 'row',
    padding:6,
    borderBottomWidth:1,
    borderColor:'gray'
  },
  cards: {
    width: '35%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardsInfo: {

   

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
});

export default ItemsBusqueda;
