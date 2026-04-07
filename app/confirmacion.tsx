import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ConfirmacionScreen() {
  const { nombre, documento, servicio, hora } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Turno solicitado correctamente</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Nombre: {nombre}</Text>
        <Text style={styles.text}>Documento: {documento}</Text>
        <Text style={styles.text}>Servicio: {servicio}</Text>
        <Text style={styles.text}>Hora: {hora}</Text>
      </View>

      <Link href="/" style={styles.button}>
        Volver al inicio
      </Link>
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0A1F44',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#0A1F44',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    overflow: 'hidden',
  },
});