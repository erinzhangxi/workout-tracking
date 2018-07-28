import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, FormLabel, FormInput } from 'react-native-elements'
import cookie from "react-cookies";
import UserService from "../../services/UserService";
import colors from 'Colors';
import {styles} from "./Login";
import BackButton from '../../elements/BackButton.js'

class EditProfile extends Component {
    static navigationOptions = {
        title: 'Edit Profile',
        headerTitleStyle: {
            color: colors.charcoal
        },
        headerStyle: {
            backgroundColor: colors.white,
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            age: '',
            currentWeight: '',
            height: '',
            userId: ''
        }
        this.userService = UserService.instance;

    }
    // TODO age, weight, height value in input don't get updated
    componentWillMount() {
        var user = cookie.load('user');
        if(user) {
            this.setProfile(user.username, user.age, user.currentWeight, user.email, user.height, user._id);
        }
    }

    // componentWillReceiveProps(newProps) {
    //     this.userService
    //         .findUserById(this.state.userId)
    //         .then(res => {
    //             this.setProfile(res.username, res.age, res.currentWeight, res.email,
    //                 res.height, res.userId)
    //         })
    // }

    updateForm = (newState) => {
        this.setState(newState)
    }

    setProfile = (username, age, currentWeight, email, height, id) => {
        this.setState({
            username: username,
            age: age,
            currentWeight: currentWeight,
            email: email,
            height: height,
            userId: id
        })
    }

    updateProfile = () => {
        let updatedUser = {
            username: this.state.username,
            email: this.state.email,
            age: this.state.age,
            currentWeight: this.state.currentWeight,
            height: this.state.height,
        }

        this.userService
            .updateUser(this.state.userId, updatedUser)
            .then(res => alert('button pressed'));
    }


    render() {
        return (
            <View>
                <BackButton page='Profile'/>
                <FormLabel>Name</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({username: text})}
                            value={this.state.username}
                            placeholder='username'/>

                <FormLabel>Email</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({email: text})}
                            value={this.state.email}
                            placeholder='email'/>

                <FormLabel>Age</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({age: text})}
                            value={this.state.age}
                            placeholder='age'/>

                <FormLabel>Current Weight</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({currentWeight: text})}
                            value={this.state.currentWeight}
                            placeholder='current weight'/>

                <FormLabel>Height</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({height: text})}
                            value={this.state.height}
                            placeholder='current height'/>

                <Button
                    onPress={this.updateProfile}
                    title='Save'
                    buttonStyle={styles.button}
                />

            </View>
        )
    }
}

export default EditProfile;
