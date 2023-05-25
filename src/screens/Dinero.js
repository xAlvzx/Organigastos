import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Dinero = ({navigation}) => {
  const [dinero, setDinero] = useState(0);

  //use effect para actualizar el dinero global cuando se regresa de la pantalla de consulta de gastos
  useFocusEffect(
    React.useCallback(() => {
      const fetchMoney = async () => {
        const savedMoney = await AsyncStorage.getItem('money');
        if (savedMoney !== null) {
          setDinero(parseFloat(savedMoney));
        }
      };
      fetchMoney();
    }, []),
  );

  //usefocus effect para actualizar el dinero global cuando se regresa de la pantalla de consulta de gastos
  useFocusEffect(
    React.useCallback(() => {
      const fetchMoney = async () => {
        const savedMoney = await AsyncStorage.getItem('money');
        if (savedMoney !== null) {
          setDinero(parseFloat(savedMoney));
        }
      };
      fetchMoney();
    }, []),
  );

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
