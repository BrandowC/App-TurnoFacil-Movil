import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { servicios } from '@/data/servicios';

export default function SolicitarScreen() {
  const { id } = useLocalSearchParams();
  const servicio = servicios.find((s) => s.id === Number(id));

  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');

  if (!servicio) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Servicio no encontrado</Text>
      </View>
    );
  }

  const handleEnviar = () => {
    if (!nombre || !documento) {
      Alert.alert('Campos requeridos', 'Por favor complete nombre y documento.');
      return;
    }

    router.push({
      pathname: '/confirmacion',
      params: {
        nombre,
        documento,
        servicio: servicio.nombre,
        hora: new Date().toLocaleTimeString('es-CO', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar turno</Text>

      <Text style={styles.label}>Servicio seleccionado</Text>
      <Text style={styles.servicio}>{servicio.nombre}</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Documento / Código</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su documento o código"
        value={documento}
        onChangeText={setDocumento}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Confirmar turno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0A1F44',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  servicio: {
    fontSize: 17,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#0A1F44',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },
});