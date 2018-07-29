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
            <ScrollView style={styles.container}>
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

                    <Text h3 style={styles.titleText}>Welcome back to PocketTrainer,</Text>
                    <Text h5 style={styles.subtitleText}>Live a healthier life starting today</Text>
                    <FormLabel>Username</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({username: text})}
                                value={this.state.username}
                                placeholder='username'/>

                    <FormLabel>Password</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({password: text})}
                        value={this.state.password}
                        placeholder='password'
                        secureTextEntry={true}/>

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
    container: {
        backgroundColor: colors.white
    },
    button: {
        backgroundColor: colors.green,
        height: 45,
        marginTop: 10,
        marginBottom: 20
    },
    buttonText: {
        fontFamily: 'Arial'
    },
    titleText: {
        fontFamily: 'Arial',
        fontSize: 25,
        color: colors.ypsDark,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    subtitleText: {
        fontFamily: 'Arial',
        fontSize: 16,
        color: colors.ypsLight,
        marginLeft: 20,
        marginRight: 20
    },
    fontStyle: {
        marginLeft: 20,
        color: colors.gray,
        fontFamily: 'Arial',
        marginTop: 20,
        marginBottom: 0
    },
    container: {
        backgroundColor: colors.white
    },
    profileContainer: {
        backgroundColor: colors.darkGreen
    },
    formlabel: {
        color: colors.white,
        fontFamily: 'Arial'
    },
    inputStyle: {
        color: colors.charcoal,
        fontFamily: 'Arial'
    },
    containerStyle: {
        backgroundColor: colors.white,
        color: colors.green
    },
})

export default Login

