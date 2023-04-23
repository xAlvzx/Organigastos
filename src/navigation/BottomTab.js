import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Ingresos from '../screens/Ingresos';
import Gastos from '../screens/Gastos';
import Dinero from '../screens/Dinero';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const tabOptions = ({route}) => ({
    tabBarActiveTintColor: '#4da2ff',
    // tabBarActiveBackgroundColor: 'grey',
    // tabBarInactiveBackgroundColor: 'orange',
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

export default BottomTab;
