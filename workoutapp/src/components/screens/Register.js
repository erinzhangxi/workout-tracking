import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';

class Register extends Component {
    static navigationOptions = {
        title: 'Register'
    }
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView>
                <Text> Register works!</Text>
            </ScrollView>
        )
    }
}

export default Register