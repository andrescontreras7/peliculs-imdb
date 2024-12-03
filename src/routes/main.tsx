import React from 'react';
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Busqueda from '../views/busqueda/Busqueda';
import Home from '../views/Home';
import Nav from '../components/nav';
import Peliculas from '../views/VistaPeliculas/Vspeliculas';
import Lista from '../views/ListaSeguimiento';
import Login from '../views/Login';

const Stack = createNativeStackNavigator();

export const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Buscar"
          component={Busqueda}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Peliculas"
          component={Peliculas}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Lista"
          component={Lista}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
      <NavWrapper />
    </NavigationContainer>
  );
};

const NavWrapper: React.FC = () => {
  const state = useNavigationState(state => state);
  const currentRoute = state.routes[state.index].name;

  if (currentRoute === 'Login') {
    return null;
  }

  return <Nav />;
};