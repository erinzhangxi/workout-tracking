import React, { Component } from 'react'
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import BottomNavBar from '../../elements/BottomNavBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon size={24} color="#611dce" name='account' />;
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={[styles.boxContainer, styles.headerContainer]}>
                    <Text h4 style={{color: 'white'}}>Profile</Text>
                </View>
                <View style={[styles.boxContainer, styles.userContainer]}>
                    <Text h4 style={styles.userFont}>username</Text>
                    <Text h4 style={styles.userFont}>Age</Text>
                    <Text h4 style={styles.userFont}>Current Weight</Text>
                </View>
                <View style={[styles.boxContainer, styles.boxThree]}>
                    <Text h3>Box Three</Text>
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    boxContainer: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    headerContainer: {
        flex: 1,
        backgroundColor: '#CE6D39',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userContainer: {
        flex: 2,
        backgroundColor: '#F17F42',

    },
    boxThree: {
        flex: 7,
        backgroundColor: '#FFEEE4'
    },
    userFont: {
        color: '#565656',
        fontSize: 17
}
})

export default Profile