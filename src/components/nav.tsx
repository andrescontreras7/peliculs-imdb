import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

type NavProps = {
    navigation: NavigationProp<any>;
};

const rutas = [
    {
        id: '1',
        emoji: '🏠',
        titulo: 'Inicio',
        ruta: 'Home',
    },
    {
        id: '2',
        emoji: '🔍',
        titulo: 'Buscar',
        ruta: 'Buscar',
    },
    {
        id: '4',
        emoji: '⭐',
        titulo: 'Favoritos',
        ruta: 'Lista',
    }
];

const Nav = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    return (
        <View style={styles.container}>
            {rutas.map((ruta) => (
                <Pressable
                    key={ruta.id}
                    style={({ pressed }) => [
                        styles.boton,
                        pressed ? styles.botonPresionado : null,
                    ]}
                    onPress={() => navigation.navigate(ruta.ruta)}
                >
                    <Text style={styles.emoji}>{ruta.emoji}</Text>
                    <Text style={styles.text}>{ruta.titulo}</Text>
                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#F6C700',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        elevation: 5,
    },
    boton: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonPresionado: {
        backgroundColor: '#e0a800',
    },
    text: {
        fontFamily: 'Roboto',
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    emoji: {
        fontSize: 24,
    },
});

export default Nav;