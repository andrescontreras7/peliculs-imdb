import React, {useEffect, useState} from 'react';

import type {PropsWithChildren} from 'react';

import {
  FlatList,



  StyleSheet,
  Text,
  useColorScheme,
  Pressable,
  View,
} from 'react-native';


function VsLista({data}) {
  


  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Pressable>
            <View>
              <Text>{item.title}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={pelicula => pelicula.id}
      />
    </View>
  );
}

export default VsLista;
