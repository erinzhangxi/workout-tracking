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
            backgroundColor: colors.charcoal
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

    componentWillMount() {
        var user = cookie.load('user');
        if(user) {
            this.setProfile(user.username, user.age, user.currentWeight);
        }
    }

    componentDidMount() {

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
                <View style={[styles.boxContainer]}>
                    <View style={styles.avatarContainer}>
                        <Image source={PROFILE_PICTURE}
                               style={{
                                   width: 40,
                                   height: 40}}/>
                    </View>
                    <View style={styles.userContainer}>
                    <Icon
                        name='settings-outline'
                        size={20}
                        color={'white'}/>}

                    <Text h4 style={styles.userFont}>username {this.state.username}</Text>
                    <Text h4 style={styles.userFont}>Age {this.state.age}</Text>
                    <Text h4 style={styles.userFont}>Current Weight {this.state.currentWeight}</Text>
                    </View>
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
        flex: 3,
        backgroundColor: colors.ypsLight,
        flexDirection: 'row'
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    userContainer: {
        flex: 2,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 30


    },
    avatarContainer: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent:'center',
        marginLeft: 30


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