import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { supabase } from '../supabase/Config';


type Tarea = {
  id: number;
  user_id: string;
  title: string;
  completed: boolean;
  createdat: string;
};

type Screen3RouteProp = RouteProp<{ Screen3: { tarea: Tarea } }, 'Screen3'>;

export default function Screen3() {
  const navigation = useNavigation();
  const route = useRoute<Screen3RouteProp>();
  const tarea = route.params.tarea;

  const [descripcion, setDescripcion] = useState(tarea.title);
  const [fecha, setFecha] = useState(tarea.createdat);
  const [completado, setCompletado] = useState(tarea.completed);

  const guardarCambios = async () => {
    const { error } = await supabase
      .from('tasks')
      .update({ title: descripcion, createdat: fecha, completed: completado })
      .eq('id', tarea.id);

    if (!error) {
      Alert.alert('Éxito', 'Tarea editada correctamente');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'No se pudo editar la tarea');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Editar Tarea</Text>
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        style={styles.input}
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        placeholder="Completado (true/false)"
        style={styles.input}
        value={completado ? 'true' : 'false'}
        onChangeText={text => setCompletado(text === 'true')}
      />
      <Button title="Editar" onPress={guardarCambios} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
  },
  botonEditar: {
    backgroundColor: '#ffd700',
    padding: 12, borderRadius: 6,
    marginTop: 20, width: '100%'
  },
  textoBoton: {
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
});