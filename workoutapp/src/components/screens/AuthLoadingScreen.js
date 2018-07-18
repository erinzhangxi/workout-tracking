import React, { Component } from 'react';
import cookie from "react-cookies";
import {View, Image, StyleSheet} from 'react-native';
import { Text} from 'react-native-elements'

// TODO
// Login doesnt lead to home page with credentials
class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.getUserCookie();
    }

    getUserCookie = () => {
        var user = cookie.load('user');
        this.props.navigation.navigate(user ? 'App' : 'Auth');
        // if(user) {
        //     this.setProfile(user.username, user._id);
        // }
    }

    render() {
        return (
            <View>
                <Text h3>
                    Loading Screen
                </Text>

            </View>
        );
    }
}

export default AuthLoadingScreen;