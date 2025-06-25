import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabase/Config';
import { useNavigation } from '@react-navigation/native';

type Tarea = {
  id: number;
  user_id: string;
  title: string;
  completed: boolean;
  createdat: string;
};

export default function Screen1() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const user_id = 'userId1'; // Cambia por el id real del usuario
  const navigation = useNavigation();

  const obtenerTareas = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user_id)
      .order('id', { ascending: false });

    if (error) {
      Alert.alert('Error', 'No se pudieron obtener las tareas');
      setTareas([]);
    } else if (Array.isArray(data)) {
      setTareas(data as Tarea[]);
    } else {
      setTareas([]);
    }
  };

  useEffect(() => {
    obtenerTareas();

    // SUSCRIPCIÓN REALTIME
    const channel = supabase
      .channel('public:tasks')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          obtenerTareas();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const eliminarTarea = async (id: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) {
      // La lista se actualizará automáticamente por realtime
      Alert.alert('Eliminado', 'Tarea eliminada');
    } else {
      Alert.alert('Error', 'No se pudo eliminar la tarea');
    }
  };

  const editarTarea = (tarea: Tarea) => {
    // @ts-ignore
    navigation.navigate('Screen3', { tarea });
  };

  const renderItem = ({ item }: { item: Tarea }) => (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.title}</Text>
      <Text>Completado: {item.completed ? 'Sí' : 'No'}</Text>
      <Text>Fecha: {item.createdat}</Text>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.botonEditar} onPress={() => editarTarea(item)}>
          <Text style={styles.textoBoton}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarTarea(item.id)}>
          <Text style={styles.textoBoton}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Tareas</Text>
      <FlatList
        data={tareas}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay tareas</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { backgroundColor: '#f2f2f2', padding: 16, borderRadius: 8, marginBottom: 12 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  botones: { flexDirection: 'row', marginTop: 10 },
  botonEditar: { backgroundColor: '#ffd700', padding: 8, borderRadius: 6, marginRight: 10 },
  botonEliminar: { backgroundColor: '#ff5252', padding: 8, borderRadius: 6 },
  textoBoton: { color: '#222', fontWeight: 'bold' },
});