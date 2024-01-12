import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import các màn hình cho Bottom Navigator
import HomeScreen from '../screens/HomeScreen';
import DetailsSceeen from '../screens/DetailsScreen';
import MyCartScreen from '../screens/MyCartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Details" component={DetailsSceeen} />
      <Tab.Screen name="MyCart" component={MyCartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;