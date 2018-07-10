import React, { Component } from 'react'
import {View, Image, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PROFILE_PICTURE from '../../assets/images/profile-placeholder.png'
import cookie from "react-cookies";
import colors from 'Colors';

class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
        headerTitleStyle: {
            color: colors.white
        },
        headerStyle: {
            backgroundColor: colors.black
        },
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
            username: '',
            age: '',
            weight: ''
        }
    }

    componentDidMount() {
        var user = cookie.load('user');
        if(user) {
            this.setProfile(user.username, user.age, user.currentWeight);
        }
    }

    setProfile = (username, age, currentWeight) => {
        this.setState({
            username: username,
            age: age,
            currentWeight: currentWeight
        })
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={[styles.boxContainer, styles.userContainer]}>
                    <Icon
                    name='settings-outline'
                    size={20}
                    color={'white'}/>}
                    <Image source={PROFILE_PICTURE}
                           style={{
                               width: 40,
                               height: 40}}/>
                    <Text h4 style={styles.userFont}>{this.state.username}</Text>
                    <Text h4 style={styles.userFont}>Age {this.state.age}</Text>
                    <Text h4 style={styles.userFont}>Current Weight {this.state.currentWeight}</Text>
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
        flexDirection: 'column',
        backgroundColor: colors.black
    },
    boxContainer: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    // headerContainer: {
    //     flex: 1,
    //     backgroundColor: '#CE6D39',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flexDirection: 'row'
    // },
    userContainer: {
        flex: 2,
        backgroundColor: colors.ypsLight,
        alignItems: 'flex-end'

    },
    boxThree: {
        flex: 7,
        backgroundColor: colors.yps
    },
    userFont: {
        color: '#565656',
        fontSize: 17
    }
})

export default Profile