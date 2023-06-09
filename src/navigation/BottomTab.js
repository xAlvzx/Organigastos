import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Ingresos from '../screens/Ingresos';
import Gastos from '../screens/Gastos';
import Dinero from '../screens/Dinero';
import Comida from '../screens/Comida';
import Transportes from '../screens/Transporte';
import Despensas from '../screens/Despensas';
import Higiene from '../screens/HigienePersonal';
import Otros from '../screens/OtrosGastos';
import Ahorros from '../screens/Ahorros';
import ConsultaGastos from '../screens/ConsultaGastos';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTab = () => {
  const tabOptions = ({route}) => ({
    tabBarActiveTintColor: '#4da2ff',
    tabBarIcon: ({focused, color, size}) => {
      let iconName = '';
      switch (route.name) {
        case 'Ingresos':
          iconName = focused ? 'cash' : 'cash-outline';
          break;
        case 'Mi Dinero':
          iconName = focused ? 'wallet' : 'wallet-outline';
          break;
        case 'Gastos':
          iconName = focused ? 'cart' : 'cart-outline';
          break;
      }
      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarLabel: ({focused, color}) => {
      let labelText = '';
      switch (route.name) {
        case 'Ingresos':
          labelText = 'Ingresos';
          break;
        case 'Mi Dinero':
          labelText = 'Mi Dinero';
          break;
        case 'Gastos':
          labelText = 'Gastos';
          break;
      }
      return <Text style={{textAlign: 'center', color}}>{labelText}</Text>;
    },
  });

  const screenOptions = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#4da2ff',
    },
    headerTitleStyle: {
      fontSize: 28,
      color: '#FFFFFF',
    },
  };

  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="Ingresos"
        component={Ingresos}
        options={screenOptions}
      />
      <Tab.Screen name="Gastos" component={Gastos} options={screenOptions} />
      <Tab.Screen name="Mi Dinero" component={Dinero} options={screenOptions} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const screenOptions = {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: '#4da2ff',
    },
    headerTitleStyle: {
      fontSize: 28,
      color: '#FFFFFF',
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Comida" component={Comida} options={screenOptions} />
      <Stack.Screen
        name="Transportes"
        component={Transportes}
        options={screenOptions}
      />
      <Stack.Screen
        name="Despensas"
        component={Despensas}
        options={screenOptions}
      />
      <Stack.Screen
        name="Higiene Personal"
        component={Higiene}
        options={screenOptions}
      />
      <Stack.Screen
        name="Otros Gastos"
        component={Otros}
        options={screenOptions}
      />
      <Stack.Screen
        name="Ahorros"
        component={Ahorros}
        options={screenOptions}
      />
      <Stack.Screen
        name="Consultar Gastos"
        component={ConsultaGastos}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
