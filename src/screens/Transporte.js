import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Transporte = () => {
  const [gastoTransporte, setGastoTransporte] = useState('');
  const [totalGastado, setTotalGastado] = useState(0);
  const [dineroGlobal, setDineroGlobal] = useState(0);

  useEffect(() => {
    const fetchDineroGlobal = async () => {
      const savedDineroGlobal = await AsyncStorage.getItem('money');
      if (savedDineroGlobal !== null) {
        setDineroGlobal(parseFloat(savedDineroGlobal));
      }
    };
    fetchDineroGlobal();
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
      const gastoFloat = parseFloat(gastoTransporte);
      if (!isNaN(gastoFloat)) {
        const gastoActual = await AsyncStorage.getItem('gastoTransporte');
        const nuevoTotal = parseFloat(gastoActual || '0') + gastoFloat;
        await AsyncStorage.setItem('gastoTransporte', nuevoTotal.toString());

        const nuevoDineroGlobal = dineroGlobal - gastoFloat;
        await AsyncStorage.setItem('money', nuevoDineroGlobal.toString());
        setDineroGlobal(nuevoDineroGlobal);

        setTotalGastado(nuevoTotal);
        setGastoTransporte('');
      }
    } catch (error) {
      console.log('Error al guardar el gasto:', error);
    }
  };

  const obtenerTotalGastado = async () => {
    try {
      const gastoActual = await AsyncStorage.getItem('gastoTransporte');
      if (gastoActual !== null) {
        setTotalGastado(parseFloat(gastoActual));
      }
    } catch (error) {
      console.log('Error al obtener el total gastado:', error);
    }
  };

  const resetearTotalGastado = () => {
    Alert.alert(
      'Restablecer Total',
      '¿Estás seguro de que quieres restablecer el total gastado?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Restablecer',
          style: 'destructive',
          onPress: handleRestablecerTotal,
        },
      ],
      {cancelable: true},
    );
  };

  const handleRestablecerTotal = async () => {
    try {
      await AsyncStorage.removeItem('gastoTransporte');
      setTotalGastado(0);
    } catch (error) {
      console.log('Error al restablecer el total gastado:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Gastos en Transporte</Text>
      <Text style={styles.total}>
        Total gastado: ${totalGastado.toFixed(2)}
      </Text>
      <Text style={styles.dineroGlobal}>
        Dinero restante: ${dineroGlobal.toFixed(2)}
      </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ingrese el monto gastado"
        value={gastoTransporte}
        onChangeText={text => setGastoTransporte(text)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  total: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
  dineroGlobal: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000000',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000000',
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
});

export default Transporte;
