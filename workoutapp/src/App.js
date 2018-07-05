import React, { Component } from 'react'
import { Login, Register, Home } from './components/screens'
import { createStackNavigator } from 'react-navigation'


const App = createStackNavigator({
    Login: Login,
    Register: Register,
    Home: Home

});


export default App;