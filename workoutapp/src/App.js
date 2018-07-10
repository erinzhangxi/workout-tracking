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

const ProgressStacks = createStackNavigator({
    Progress: Progress
});

const ProfileStacks = createStackNavigator({
    Profile: Profile
});

const App = createBottomTabNavigator({
    Home: { screen:  HomeStacks},
    FoodLog: { screen: FoodLogsStacks },
    Progress: { screen: ProgressStacks },
    Profile: { screen: ProfileStacks }
});

export default App;