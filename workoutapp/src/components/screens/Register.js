import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class Register extends Component {
    static navigationOptions = {
        title: 'Register'
    }
    constructor(props) {
        super(props)
    }

    handleSubmit() {
        alert("register");
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Email</FormLabel>
                <FormInput ref={(input) => {this.email = input}}
                           placeholder='email'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                <FormLabel>Username</FormLabel>
                <FormInput
                    ref={input => this.username = input}
                    placeholder='username'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>


                <FormLabel>Password</FormLabel>
                <FormInput
                    ref={input => this.password = input}
                    placeholder='password'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                <FormLabel>Confirm Password</FormLabel>
                <FormInput
                    ref={input => this.password2 = input}
                    placeholder='please type in the same password'/>
                <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                <Button
                    title='Register'
                    onPress={this.handleSubmit.bind(this)}/>


            </ScrollView>
        )
    }
}

export default Register