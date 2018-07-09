import React, { Component } from 'react'
import { Login, Register, Home, FoodLog, Progress, Profile, FoodLogEditor, WorkoutEditor } from './components/screens'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'

const HomeStacks = createStackNavigator({
    Home: Home,
    Login: Login,
    WorkoutEditor: WorkoutEditor,
    Register: Register

});


const FoodLogsStacks = createStackNavigator({
    FoodLog: FoodLog,
    FoodLogEditor: FoodLogEditor
});


const App = createBottomTabNavigator({
    Home: { screen:  HomeStacks},
    FoodLog: { screen: FoodLogsStacks },
    Progress: { screen: Progress },
    Profile: { screen: Profile }
});

export default App;