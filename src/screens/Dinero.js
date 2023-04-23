import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dinero = ({navigation}) => {
  const [dinero, setDinero] = useState(0);

  useEffect(() => {
    const fetchDinero = async () => {
      const savedDinero = await AsyncStorage.getItem('money');
      if (savedDinero !== null) {
        setDinero(parseFloat(savedDinero));
      }
    };
    fetchDinero();
  }, []);

  const handleConsultarGastos = () => {
    navigation.navigate('ConsultaGastos');
  };

  return (
    <View style={styles.container}>
      <View style={styles.moneyContainer}>
        <Text style={styles.moneyText}>${dinero}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConsultarGastos}>
        <Text style={styles.buttonText}>Consultar gastos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  moneyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    width: 200,
    height: 200,
    marginTop: 100,
    marginBottom: 50,
  },
  moneyText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
  button: {
    backgroundColor: '#4da2ff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Dinero;
