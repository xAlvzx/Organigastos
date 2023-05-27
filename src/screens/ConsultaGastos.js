import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConsultaGastos = () => {
  const [gastos, setGastos] = useState([]);
  const [totalGastado, setTotalGastado] = useState(0);

  useEffect(() => {
    obtenerGastos();
  }, []);

  const obtenerGastos = async () => {
    try {
      const gastosComida = await AsyncStorage.getItem('gastoComida');
      const gastosTransporte = await AsyncStorage.getItem('gastoTransporte');
      const gastosDespensas = await AsyncStorage.getItem('gastoDespensas');
      const gastosHigiene = await AsyncStorage.getItem('gastoHigiene');
      const gastosOtros = await AsyncStorage.getItem('gastoOtros');
      const gastosAhorros = await AsyncStorage.getItem('gastoAhorros');

      const gastosArray = [
        {categoria: 'Comidas', total: gastosComida},
        {categoria: 'Transportes', total: gastosTransporte},
        {categoria: 'Despensas', total: gastosDespensas},
        {categoria: 'Higiene', total: gastosHigiene},
        {categoria: 'Otros', total: gastosOtros},
        {categoria: 'Ahorros', total: gastosAhorros},
      ];

      setGastos(gastosArray);

      // Calcular el total gastado
      const total = gastosArray.reduce(
        (sum, item) => sum + parseFloat(item.total || 0),
        0,
      );
      setTotalGastado(total);
    } catch (error) {
      console.log('Error al obtener los gastos:', error);
    }
  };

  const renderGasto = ({item}) => (
    <View style={styles.gastoContainer}>
      <Text style={styles.categoria}>{item.categoria}</Text>
      <Text style={styles.total}>
        Total gastado: ${parseFloat(item.total).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos Anteriores</Text>
      <FlatList
        data={gastos}
        renderItem={renderGasto}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.totalGastadoContainer}>
        <Text style={styles.totalGastadoLabel}>Total Gastado:</Text>
        <Text style={styles.totalGastadoAmount}>
          ${totalGastado.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  totalGastadoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  totalGastadoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginRight: 5,
    color: '#000000',
  },
  totalGastadoAmount: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#000000',
  },
  gastoContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  categoria: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  total: {
    fontSize: 16,
    color: '#000000',
  },
});

export default ConsultaGastos;
