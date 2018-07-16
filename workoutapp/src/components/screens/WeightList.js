import React, { Component } from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import WorkoutItem from './../../elements/WorkoutItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import cookie from "react-cookies";

class WeightList extends Component {
    static navigationOptions = {
        title: 'Weight History',
        headerTitleStyle: {
            color: colors.white
            // fontFamily: fonts.montserrat
        },
        headerStyle: {
            backgroundColor: colors.charcoal,
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }

    render() {
        return (
            <View>
                <Text>Weight History Page</Text>
            </View>
        )

    }

}

export default WeightList;