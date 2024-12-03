import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [session, setSession] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const handleDeepLink = async (event) => {
      const url = event.url;
      console.log('Deep link recibido:', url);

      const urlParts = url.split('#');
      const queryString = urlParts.length > 1 ? urlParts[1] : urlParts[0];

      if (queryString) {
        const params = new URLSearchParams(queryString);
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        if (access_token && refresh_token) {
          try {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (!error) {
              const { data: updatedSession } = await supabase.auth.getSession();
              setSession(updatedSession.session);
            }
          } catch (error) {
            console.error('Error al configurar la sesión con los tokens:', error);
          }
        }
      }
    };

    const linkingListener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      linkingListener.remove();
    };
  }, []);

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'myapp://auth/callback',
      },
    });

    if (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    } else {
      Linking.openURL(data.url);
    }
  };

  useEffect(() => {
    if (session) {
      navigation.replace('Home');
    }
  }, [session, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Bienvenido!</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>
      <View style={styles.decorativeContainer}>
        <View style={styles.decorativeBox} />
        <View style={styles.decorativeBox} />
        <View style={styles.decorativeBox} />
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={signInWithGoogle}>
        <Image
          source={require('../../public/image.png')} // Icono de Google
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
      </TouchableOpacity>
      {session && <Text style={styles.loggedInText}>Estás logueado</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6C700',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  decorativeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  decorativeBox: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    opacity: 0.3,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loggedInText: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});

export default LoginScreen;