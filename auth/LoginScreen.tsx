import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { supabase } from '../supabase/Config'

export default function LoginScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasenia,
    })
    
    console.log(data)
    if(data.user == null){
      Alert.alert("Error", "Usuario o contraseña incorrectos")
    }else{
      navigation.navigate("tabs")
    }
  }

  return (
    <View style={styles.container}>
      {/* Logo de la app de tareas */}
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3281/3281289.png' }}
        style={styles.logo}
      />
      
      <Text style={styles.title}>Tareas</Text>
      <Text style={styles.subtitle}>Organiza tus tareas eficientemente</Text>
      
      <TextInput
        placeholder='Ingresar email'
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder='Ingresar contraseña'
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={(texto) => setcontrasenia(texto)}
        value={contrasenia}
        secureTextEntry={true}
      />

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => login()}
      >
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  )
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
  },
  input: {
    fontSize: 16,
    backgroundColor: 'white',
    width: "100%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2E86C1', // Borde azul
    color: '#333',
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
  registerText: {
    color: '#2E86C1',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});