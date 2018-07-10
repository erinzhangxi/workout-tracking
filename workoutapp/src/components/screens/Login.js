import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import cookie from "react-cookies";
import UserService from "../../services/UserService";
import colors from 'Colors';

class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props);
        this.state =
            {
                username: '',
                password: ''
            }
        this.userService = UserService.instance;

    }

    handleSubmit() {
        let user = {
            username: this.state.username,
            password: this.state.password
        }

        this.userService
            .login(user)
            .then(res => {
        // TODO need to stop invalidated user from going back to Home tab
                cookie.save('user', JSON.stringify(res));
                this.props.navigation.navigate('Home');

            })
    }

    updateForm = (newState) => {
        this.setState(newState)
    }
    render() {
        return (
            <ScrollView>
                {/*<FixedHeader/>*/}
                <View style={styles.homeContainer}>
                    <FormLabel>Username</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({username: text})}
                                value={this.state.username}
                                placeholder='username'/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                    <FormLabel>Password</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({password: text})}
                        value={this.state.password}
                        placeholder='password'/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>
                    <Button
                        title='Login'
                        onPress={this.handleSubmit.bind(this)}/>
                    <Text h5>Don't have an account?
                    </Text>

                    <Button title="Sign up here"
                            onPress={() => this.props.navigation
                                .navigate('Register') } />

                </View>
            </ScrollView>

        )
    }

}

export const styles = StyleSheet.create({
    // homeContainer: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // }
})

export default Login