import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { servicios } from '@/data/servicios';

export default function DetalleScreen() {
  const { id } = useLocalSearchParams();
  const servicio = servicios.find((s) => s.id === Number(id));

  if (!servicio) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Servicio no encontrado</Text>
      </View>
    );
  }

  const sinCupos = servicio.cupos === 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del servicio</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>{servicio.nombre}</Text>

        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{servicio.descripcion}</Text>

        <Text style={styles.label}>Cupos:</Text>
        <Text style={styles.value}>{servicio.cupos}</Text>

        <Text style={styles.label}>Horario:</Text>
        <Text style={styles.value}>{servicio.horario}</Text>

        {sinCupos ? (
          <Text style={styles.sinCupos}>Sin cupos</Text>
        ) : (
          <Link
            href={{
              pathname: '/solicitar',
              params: { id: servicio.id.toString() },
            }}
            style={styles.button}
          >
            Solicitar turno
          </Link>
        )}
      </View>
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
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#0A1F44',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    overflow: 'hidden',
  },
  sinCupos: {
    marginTop: 20,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
  },
});