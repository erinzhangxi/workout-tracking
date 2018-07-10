import React, { Component } from 'react'
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import UserService from '../../services/UserService.js'
import cookie from 'react-cookies'

class Register extends Component {
    static navigationOptions = {
        title: 'Register'
    }

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            age: '',
            currentWeight: ''
        }
        this.userService = UserService.instance;
    }


    handleSubmit() {
        let user = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            age: this.state.age,
            currentWeight: this.state.currentWeight
        }

        this.userService
            .createUser(user)
            .then((res) => {
                if (res.status === 500) {
                    alert('Sorry, that username is already taken')
                } else {
                    cookie.save('user', JSON.stringify(res))
                    console.log(res);
                    this.props.navigation.navigate("Home");
                }
            })
    }

    // validate = (text) => {
    //     this.setState({
    //             username: text
    //         }
    //     );
    // }

    updateForm = (newState) => {
        this.setState(newState)
    }


    render() {
        return (
            <ScrollView>
                <FormLabel>Email</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({email: text})}
                    value={this.state.email}
                    placeholder='email'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                <FormLabel>Username</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({username: text})}
                    value={this.state.username}
                    placeholder='username'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>


                <FormLabel>Password</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({password: text})}
                    value={this.state.password}
                    placeholder='password'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({password2: text})}
                    value={this.state.password2}
                    placeholder='please type in the same password'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>


                <FormLabel>Age</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({age: text})}
                    value={this.state.age}
                    placeholder='Age'/>


                <FormLabel>Current Weight</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({currentWeight: text})}
                    value={this.state.currentWeight}
                    placeholder='Current Weight'/>


                <Button
                    title='Register'
                    onPress={this.handleSubmit.bind(this)}/>


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

})


export default Register