import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Gastos = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/98/98017.png',
          }}
          style={styles.itemImage}
        />
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => navigation.navigate('Comida')}>
          <Text style={styles.itemText}>Comidas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/61/61985.png',
          }}
          style={styles.itemImage}
        />
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => navigation.navigate('Transportes')}>
          <Text style={styles.itemText}>Transportes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2600/2600213.png',
          }}
          style={styles.itemImage}
        />
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => navigation.navigate('Despensas')}>
          <Text style={styles.itemText}>Despensas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1694/1694113.png',
          }}
          style={styles.itemImage}
        />
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => navigation.navigate('Higiene Personal')}>
          <Text style={styles.itemText}>Higiene personal</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2273/2273172.png',
          }}
          style={styles.itemImage}
        />
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => navigation.navigate('Otros Gastos')}>
          <Text style={styles.itemText}>Otros gastos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/938/938339.png',
          }}
          style={styles.itemImage}
        />
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => navigation.navigate('Ahorros')}>
          <Text style={styles.itemText}>Ahorros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    width: '50%',
    padding: 10,
  },
  itemImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  itemButton: {
    backgroundColor: '#4da2ff',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Gastos;
