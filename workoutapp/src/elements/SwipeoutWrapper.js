import React, { Component } from 'react'
import {View, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';

class SwipeoutWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {this.props.deleteNote(this.props.item, this.props.id)}
        }];


        return (
            <Swipeout right={swipeBtns}
                      autoClose='true'
                      backgroundColor= 'transparent'>
                <ListItem
                    title={this.props.item.weight}
                    subtitle={this.props.item.date}/>
            </Swipeout>
        )
    }
}

export default SwipeoutWrapper;