import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { supabase } from '../supabase/Config';
import { useNavigation } from '@react-navigation/native';

export default function Screen4() {
  const navigation = useNavigation();

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    } else {
      Alert.alert('Sesión cerrada', '¡Hasta pronto!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.icons8.com/fluency/96/logout-rounded.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Cerrar Sesión</Text>
      <Text style={styles.subtitle}>¿Estás segura que deseas salir?</Text>
      <TouchableOpacity style={styles.loginButton} onPress={cerrarSesion}>
        <Text style={styles.buttonText}>CERRAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Fondo claro
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    tintColor: '#2E86C1', // Azul para el ícono
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86C1', // Azul principal
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#27AE60', // Verde secundario
    marginBottom: 30,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#27AE60', // Verde principal
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});