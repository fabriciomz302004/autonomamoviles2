import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; 
import { supabase } from '../supabase/Config';

export default function OperacionesScreen() {
  const [descripcion, setDescripcion] = useState('');
  const [completado, setCompletado] = useState(false);
  const [fecha, setFecha] = useState('');

  const guardar = async () => {
    if (!descripcion || !fecha) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
   
    const user_id = 'userId1';
    const { error } = await supabase
      .from('tasks')
      .insert([{ user_id, title: descripcion, completed: completado, createdat: fecha }]);
    if (error) {
      Alert.alert('Error', 'No se pudo guardar');
    } else {
      Alert.alert('Éxito', 'Tarea guardada correctamente');
      setDescripcion('');
      setCompletado(false);
      setFecha('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agregar Tarea</Text>
      <Image
        source={{ uri: 'https://img.icons8.com/ios-filled/100/checked-checkbox.png' }}
        style={styles.imagen}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Picker
        selectedValue={completado}
        style={styles.input}
        onValueChange={(itemValue) => setCompletado(itemValue)}
      >
        <Picker.Item label="No completado" value={false} />
        <Picker.Item label="Completado" value={true} />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={setFecha}
      />
      <TouchableOpacity style={styles.boton} onPress={guardar}>
        <Text style={styles.textoBoton}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  imagen: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  input: {
    width: 250,
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  boton: {
    width: 250,
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    fontSize: 18,
    color: '#222',
    fontWeight: 'bold',
  },
});