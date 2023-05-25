import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Ingresos = () => {
  const [money, setMoney] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalVisibleSubtract, setModalVisibleSubtract] = useState(false);

  //use effect para actualizar el dinero global cuando se regresa de la pantalla de consulta de gastos
  useFocusEffect(
    React.useCallback(() => {
      const fetchMoney = async () => {
        const savedMoney = await AsyncStorage.getItem('money');
        if (savedMoney !== null) {
          setMoney(parseFloat(savedMoney));
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
          setMoney(parseFloat(savedMoney));
        }
      };
      fetchMoney();
    }, []),
  );

  const addMoney = () => {
    setModalVisible(true);
  };
  const subtractMoney = () => {
    setModalVisibleSubtract(true);
  };

  const closeModalSubtract = () => {
    setInputValue('');
    setModalVisibleSubtract(false);
  };

  useEffect(() => {
    const fetchMoney = async () => {
      const savedMoney = await AsyncStorage.getItem('money');
      if (savedMoney !== null) {
        setMoney(parseFloat(savedMoney));
      }
    };
    fetchMoney();
  }, []);

  const confirmAddMoney = async () => {
    const moneyToAdd = parseFloat(inputValue);
    if (!isNaN(moneyToAdd)) {
      const totalMoney = money + moneyToAdd;
      await AsyncStorage.setItem('money', totalMoney.toString());
      setMoney(totalMoney);
      setInputValue('');
      setModalVisible(false);
    }
  };

  const handleSubtractMoney = async () => {
    const subtractedMoney = parseFloat(inputValue);
    if (!isNaN(subtractedMoney)) {
      const newMoney = money - subtractedMoney;
      await AsyncStorage.setItem('money', newMoney.toString());
      setMoney(newMoney);
      setInputValue('');
      setModalVisibleSubtract(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.moneyContainer}>
        <Text style={styles.moneyText}>${money}</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addMoney}>
        <Text style={styles.addButtonText}>Añadir dinero</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subtractButton} onPress={subtractMoney}>
        <Text style={styles.subtractButtonText}>Quitar dinero</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir dinero</Text>
            <TextInput
              style={[styles.modalInput]}
              keyboardType="decimal-pad"
              placeholder="$0.00"
              placeholderTextColor="#000000"
              value={inputValue}
              onChangeText={setInputValue}
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={confirmAddMoney}>
              <Text style={styles.modalButtonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <Modal
        visible={modalVisibleSubtract}
        animationType="slide"
        transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Quitar dinero</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="decimal-pad"
              placeholder="$0.00"
              placeholderTextColor="#000000"
              value={inputValue}
              onChangeText={setInputValue}
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                handleSubtractMoney();
              }}>
              <Text style={styles.modalButtonText}>Quitar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModalSubtract}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  subtractButton: {
    backgroundColor: '#ff534a',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  subtractButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  moneyText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
  addButton: {
    backgroundColor: '#4da2ff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 100,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: '#000000',
    width: '100%',
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Ingresos;
