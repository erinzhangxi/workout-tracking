import React, { Component } from 'react'
import { Home, Register } from './components/screens'
import { createStackNavigator } from 'react-navigation'


const App = createStackNavigator({
    Home,Register

});


export default App;