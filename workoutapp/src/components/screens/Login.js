import React, { Component } from 'react'
import { View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import cookie from "react-cookies";
import UserService from "../../services/UserService";
import colors from 'Colors';
import Animation from 'lottie-react-native';
import gagaha from '../../assets/animations/gagaha.json';
import bg from '../../assets/images/login.png';

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
            <ImageBackground source={bg} style={styles.backgroundImage}>
                {/*<FixedHeader/>*/}
                <ScrollView>
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
                        <FormLabel labelStyle={styles.formlabel}>Username</FormLabel>
                        <FormInput  onChangeText={text => this.updateForm({username: text})}
                                    value={this.state.username}
                                    placeholder='username'
                                    inputStyle={styles.inputStyle}/>

                        <FormLabel labelStyle={styles.formlabel}>Password</FormLabel>
                        <FormInput
                            onChangeText={text => this.updateForm({password: text})}
                            value={this.state.password}
                            placeholder='password'
                            secureTextEntry={true}
                            inputStyle={styles.inputStyle}dd/>

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
            </ImageBackground>

        )
    }

}

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // resizeMode: 'stretch', // or 'cover'
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
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    titleTextDarkBackground: {
        fontFamily: 'Arial',
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    subtitleText: {
        fontFamily: 'Arial',
        fontSize: 16,
        color: colors.white,
        marginLeft: 20,
        marginRight: 20
    },
    fontStyle: {
        marginLeft: 20,
        color: colors.white,
        fontFamily: 'Arial',
        marginTop: 20,
        marginBottom: 0
    },
    // container: {
    //     backgroundColor: colors.white
    // },
    profileContainer: {
        backgroundColor: colors.darkGreen
    },
    formlabel: {
        color: colors.white,
        fontFamily: 'Arial'
    },
    inputStyle: {
        color: colors.white,
        fontFamily: 'Arial'
    },
    containerStyle: {
        backgroundColor: colors.white,
        color: colors.green
    },
    gearContainer: {
        width: 100,
        height: 100
    },
    gear: {
        width: 100,
        height: 100
    },
    profilePageHeader: {
        flexDirection: 'row'
    }
})

export default Login

