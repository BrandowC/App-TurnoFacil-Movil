import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const servicios = [
  { id: 1, nombre: 'Asesoría académica', cupos: 5 },
  { id: 2, nombre: 'Certificados', cupos: 0 },
  { id: 3, nombre: 'Bienestar universitario', cupos: 8 },
  { id: 4, nombre: 'Registro académico', cupos: 3 },
  { id: 5, nombre: 'Psicología', cupos: 2 },
  { id: 6, nombre: 'Financiero', cupos: 4 },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TurnoFácil</Text>
      <Text style={styles.subtitle}>Lista de servicios</Text>

      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.cupos}>Cupos: {item.cupos}</Text>

            <Link
              href={{
                pathname: '/detalle',
                params: { id: item.id.toString() },
              }}
              style={styles.button}
            >
              Ver detalle
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
    color: '#0A1F44',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cupos: {
    marginBottom: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#0A1F44',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    overflow: 'hidden',
  },
});