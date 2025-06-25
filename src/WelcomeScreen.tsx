import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3281/3281289.png' }}
                style={styles.logo}
              />
        <Text style={styles.title}>TAREAS</Text>
        <Text style={styles.subtitle}>Bienvenido a tu gestor de tareas</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => navigation.navigate("Registro")}
      >
        <Text style={styles.registerButtonText}>REGISTRARSE</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
    tintColor: '#2E86C1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86C1',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#27AE60',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#27AE60',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  registerButton: {
    backgroundColor: '#2E86C1',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
