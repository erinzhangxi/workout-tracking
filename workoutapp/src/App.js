import React, { Component } from 'react'
import { Login, Register, Home, FoodLog, Progress, Profile, FoodLogEditor } from './components/screens'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

const HomeStacks = createStackNavigator({
    Home: Home,
    Login: Login,
    Register: Register,
    FoodLogEditor: FoodLogEditor

});

const App = createBottomTabNavigator({
    Home: { screen:  HomeStacks},
    FoodLog: { screen: FoodLog },
    Progress: { screen: Progress },
    Profile: { screen: Profile }
});

export default App;