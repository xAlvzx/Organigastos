import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Gastos = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/931/332/non_2x/kids-coloring-pages-cute-cat-character-illustration-eps-and-image-free-vector.jpg',
          }} // aquí puedes cambiar la URL por la imagen que desees
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemText}>Comidas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/931/332/non_2x/kids-coloring-pages-cute-cat-character-illustration-eps-and-image-free-vector.jpg',
          }} // aquí puedes cambiar la URL por la imagen que desees
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemText}>Transportes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/931/332/non_2x/kids-coloring-pages-cute-cat-character-illustration-eps-and-image-free-vector.jpg',
          }} // aquí puedes cambiar la URL por la imagen que desees
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemText}>Despensas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/931/332/non_2x/kids-coloring-pages-cute-cat-character-illustration-eps-and-image-free-vector.jpg',
          }} // aquí puedes cambiar la URL por la imagen que desees
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemText}>Higiene personal</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/931/332/non_2x/kids-coloring-pages-cute-cat-character-illustration-eps-and-image-free-vector.jpg',
          }} // aquí puedes cambiar la URL por la imagen que desees
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.itemButton}>
          <Text style={styles.itemText}>Otros gastos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: 'https://static.vecteezy.com/system/resources/previews/008/931/332/non_2x/kids-coloring-pages-cute-cat-character-illustration-eps-and-image-free-vector.jpg',
          }} // aquí puedes cambiar la URL por la imagen que desees
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.itemButton}>
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
    width: 100,
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
