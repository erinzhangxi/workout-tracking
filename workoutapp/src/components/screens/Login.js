import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import cookie from "react-cookies";
import UserService from "../../services/UserService";
import colors from 'Colors';
import MainApp from '../../App'
import Animation from 'lottie-react-native';
import gagaha from '../../assets/animations/gagaha.json';

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
        headerStyle: {
            backgroundColor: colors.white,
        }
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

    componentDidMount() {
        this.animation.play();
    }

    handleSubmit() {
        let user = {
            username: this.state.username,
            password: this.state.password
        }

        this.userService
            .login(user)
            .then(res => {
                cookie.save('user', JSON.stringify(res));
                this.props.navigation.navigate('Home', );

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
                    <View>
                    <Animation
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={{
                            width: 300,
                            height: 200
                        }}
                        loop={true}
                        source={gagaha}
                    />
                    </View>

                    <FormLabel>Username</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({username: text})}
                                value={this.state.username}
                                placeholder='username'/>

                    <FormLabel>Password</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({password: text})}
                        value={this.state.password}
                        placeholder='password'/>

                    <Button
                        title='Login'
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                        onPress={this.handleSubmit.bind(this)}/>
                    <Text h5 style={styles.fontStyle}>Don't have an account?
                    </Text>

                    <Button title="Sign up here"
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            onPress={() => this.props.navigation
                                .navigate('Register') } />

                </View>
            </ScrollView>

        )
    }

}

export const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        height: 45
    },
    buttonText: {
        fontFamily: 'Arial'
    },
    fontStyle: {
        paddingLeft: 20,
        color: colors.gray,
        fontFamily: 'Arial'
    }
})

export default Login