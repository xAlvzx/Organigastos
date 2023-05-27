import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const OtrosGastos = () => {
  const [gastoOtros, setGastoOtros] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [totalGastado, setTotalGastado] = useState(0);
  const [dineroGlobal, setDineroGlobal] = useState(0);
  const [gastosAnteriores, setGastosAnteriores] = useState([]);

  useEffect(() => {
    const fetchDineroGlobal = async () => {
      const savedDineroGlobal = await AsyncStorage.getItem('money');
      if (savedDineroGlobal !== null) {
        setDineroGlobal(parseFloat(savedDineroGlobal));
      }
    };
    fetchDineroGlobal();
    obtenerGastosAnteriores();
  }, []);

  // Focus effect para actualizar el dinero global cuando se regresa de la pantalla de consulta de gastos
  useFocusEffect(
    React.useCallback(() => {
      const fetchDineroGlobal = async () => {
        const savedDineroGlobal = await AsyncStorage.getItem('money');
        if (savedDineroGlobal !== null) {
          setDineroGlobal(parseFloat(savedDineroGlobal));
        }
      };
      fetchDineroGlobal();
    }, []),
  );

  useEffect(() => {
    obtenerTotalGastado();
  }, [totalGastado]);

  const guardarGasto = async () => {
    try {
      const gastoFloat = parseFloat(gastoOtros);
      if (!isNaN(gastoFloat)) {
        if (gastoFloat > dineroGlobal) {
          Alert.alert(
            'Sin suficiente dinero',
            'No tienes suficiente dinero para realizar este gasto.',
          );
          return; // Detener la ejecución si no hay suficiente dinero
        }

        const nuevoGasto = {
          monto: gastoFloat,
          descripcion: descripcion || `Gasto #${gastosAnteriores.length + 1}`,
          fecha: new Date().toLocaleString(),
        };

        const gastoActual = await AsyncStorage.getItem('gastoOtros');
        const nuevoTotal = parseFloat(gastoActual || '0') + gastoFloat;
        await AsyncStorage.setItem('gastoOtros', nuevoTotal.toString());

        const nuevoDineroGlobal = dineroGlobal - gastoFloat;
        await AsyncStorage.setItem('money', nuevoDineroGlobal.toString());
        setDineroGlobal(nuevoDineroGlobal);

        setTotalGastado(nuevoTotal);
        setGastoOtros('');
        setDescripcion('');

        guardarGastoAnterior(nuevoGasto);
      }
    } catch (error) {
      console.log('Error al guardar el gasto:', error);
    }
  };

  const guardarGastoAnterior = async nuevoGasto => {
    try {
      const gastosGuardados = await AsyncStorage.getItem(
        'gastosAnterioresOtros',
      );
      if (gastosGuardados !== null) {
        const gastosArray = JSON.parse(gastosGuardados);
        const nuevosGastos = [...gastosArray, nuevoGasto];
        await AsyncStorage.setItem(
          'gastosAnterioresOtros',
          JSON.stringify(nuevosGastos),
        );
        setGastosAnteriores(nuevosGastos);
      } else {
        const nuevoArray = [nuevoGasto];
        await AsyncStorage.setItem(
          'gastosAnterioresOtros',
          JSON.stringify(nuevoArray),
        );
        setGastosAnteriores(nuevoArray);
      }
    } catch (error) {
      console.log('Error al guardar el gasto anterior:', error);
    }
  };

  const obtenerTotalGastado = async () => {
    try {
      const gastoActual = await AsyncStorage.getItem('gastoOtros');
      if (gastoActual !== null) {
        setTotalGastado(parseFloat(gastoActual));
      }
    } catch (error) {
      console.log('Error al obtener el total gastado:', error);
    }
  };

  const obtenerGastosAnteriores = async () => {
    try {
      const gastosGuardados = await AsyncStorage.getItem(
        'gastosAnterioresOtros',
      );
      if (gastosGuardados !== null) {
        const gastosArray = JSON.parse(gastosGuardados);
        setGastosAnteriores(gastosArray);
      }
    } catch (error) {
      console.log('Error al obtener los gastos anteriores:', error);
    }
  };

  const resetearTotalGastado = () => {
    Alert.alert(
      'Restablecer Total',
      '¿Estás seguro de que quieres resetear el total gastado?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Resetear',
          style: 'destructive',
          onPress: handleResetearTotal,
        },
      ],
      {cancelable: true},
    );
  };

  const handleResetearTotal = async () => {
    try {
      await AsyncStorage.removeItem('gastoOtros');
      await AsyncStorage.removeItem('gastosAnterioresOtros');
      setTotalGastado(0);
      setGastosAnteriores([]);
    } catch (error) {
      console.log('Error al resetear el total gastado:', error);
    }
  };

  const renderGastoAnterior = ({item}) => (
    <View style={styles.gastoContainer}>
      <Text style={styles.descripcion}>{item.descripcion}</Text>
      <Text style={styles.monto}>Monto gastado: ${item.monto.toFixed(2)}</Text>
      <Text style={styles.fecha}>Fecha: {item.fecha}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Otros Gastos</Text>
      <Text style={styles.subtitulo}>Dinero Disponible</Text>
      <Text style={styles.moneyText}>${dineroGlobal}</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ingrese el monto gastado"
        value={gastoOtros}
        onChangeText={text => setGastoOtros(text)}
        placeholderTextColor="#000"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese una breve descripción (opcional)"
        value={descripcion}
        onChangeText={text => setDescripcion(text)}
        placeholderTextColor="#000"
      />
      <TouchableOpacity style={styles.button} onPress={guardarGasto}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.redButton]}
        onPress={resetearTotalGastado}>
        <Text style={styles.buttonText}>Restablecer Total</Text>
      </TouchableOpacity>
      <Text style={styles.subtitulo}>Gastos Anteriores</Text>
      <Text style={styles.total}>
        Total gastado: ${totalGastado.toFixed(2)}
      </Text>
      <FlatList
        data={gastosAnteriores}
        renderItem={renderGastoAnterior}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listaGastos}
        contentContainerStyle={styles.listaGastosContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  total: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  dineroGlobal: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#4da2ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  redButton: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#000',
  },
  listaGastos: {
    width: '100%',
  },
  listaGastosContent: {
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  gastoContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  monto: {
    fontSize: 14,
    color: '#000',
    marginBottom: 2,
  },
  fecha: {
    fontSize: 14,
    color: '#888',
  },
  moneyContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  moneyText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
});

export default OtrosGastos;
