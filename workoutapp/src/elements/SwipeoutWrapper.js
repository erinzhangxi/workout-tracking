import React, { Component } from 'react'
import {View, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import colors from 'Colors';
import LinearGradient from 'react-native-linear-gradient'

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
                      autoClose={true}
                      backgroundColor= 'transparent'>
                <ListItem
                    scaleProps={{
                        friction: 90,
                        tension: 100,
                        activeScale: 0.95,
                    }}
                    linearGradientProps={{
                        colors: ['#FF9800', '#F44336'],
                        start: [1, 0],
                        end: [0.2, 0],
                    }}
                    ViewComponent={LinearGradient}
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'white' }}
                    title= {this.props.item.weight}
                    subtitle={this.props.item.date}
                    chevronColor="white"
                    chevron/>
            </Swipeout>
        )
    }
}

export default SwipeoutWrapper;

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white
    },
    // titleText: {
    //     color: colors.ypsLight
    // }
})


