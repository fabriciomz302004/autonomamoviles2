import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/Config'

export default function RegistroScreen({ navigation }: any) {
  const [correo, setcorreo] = useState("")
  const [contrasenia, setcontrasenia] = useState("")
  const [confirmacionContrasenia, setConfirmacionContrasenia] = useState("")
  const [loading, setLoading] = useState(false)

  async function registro() {
    if (contrasenia !== confirmacionContrasenia) {
      Alert.alert("Error", "Las contraseñas no coinciden")
      return
    }

    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contrasenia,
    })

    setLoading(false)
    
    if (error) {
      Alert.alert("Error", error.message)
    } else if (data) {
      Alert.alert("Éxito", "Registro completado. Por favor verifica tu email.")
      navigation.navigate("Login")
    }
  }

  return (
    <View style={styles.container}>
      {/* Logo de la app de tareas */}
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3281/3281289.png' }}
        style={styles.logo}
      />
      
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Organiza tus tareas desde hoy</Text>
      
      <TextInput
        placeholder='Ingresar email'
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setcorreo}
        value={correo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder='Ingresar contraseña'
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setcontrasenia}
        value={contrasenia}
        secureTextEntry={true}
      />

      <TextInput
        placeholder='Confirmar contraseña'
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setConfirmacionContrasenia}
        value={confirmacionContrasenia}
        secureTextEntry={true}
      />

      <TouchableOpacity 
        style={styles.registerButton}
        onPress={registro}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'CREANDO CUENTA...' : 'REGISTRARME'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
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
  registerButton: {
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
  loginText: {
    color: '#2E86C1',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});