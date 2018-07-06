import React, { Component } from 'react'
import { Login, Register, Home, FoodLog, Progress, Profile } from './components/screens'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation';
//
//
// const App = createStackNavigator({
//     Login: Login,
//     Register: Register,
//     Home: Home,
//     FoodLog: FoodLog
//
// });

const App = createBottomTabNavigator({
    Home: { screen: Home },
    FoodLog: { screen: FoodLog },
    Progress: { screen: Progress },
    Profile: { screen: Profile }
});

export default App;