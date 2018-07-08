import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class FoodLogEditor extends Component {
    static navigationOptions = {
        title: 'Food Logs Editor'
    }

    constructor(props) {
        super(props);

        this.state = {
        }
    }
    render() {
        return (
            <Text h2>Food Log Editor</Text>
        )
    }
}

export default FoodLogEditor