import React, { Component } from 'react'
import {ScrollView, ImageBackground, StyleSheet} from 'react-native';
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import UserService from '../../services/UserService.js'
import cookie from 'react-cookies'
import colors from 'Colors';
import BackButton from '../../elements/BackButton.js'
import bg from '../../assets/images/login.png';

class Register extends Component {
    static navigationOptions = {
        title: 'Register',
        headerStyle: {
            backgroundColor: colors.white,
        }
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
            <ImageBackground source={bg} style={styles.backgroundImage}>
                <ScrollView>
                    <BackButton page='Login'/>
                    <Text h3 style={styles.titleStyle}> Sign up </Text>
                    <FormLabel labelStyle={styles.formlabel}>Email</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({email: text})}
                        value={this.state.email}
                        placeholder='email'
                        inputStyle={styles.inputStyle}/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                    <FormLabel labelStyle={styles.formlabel}>Username</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({username: text})}
                        value={this.state.username}
                        placeholder='username'
                        inputStyle={styles.inputStyle}/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>


                    <FormLabel labelStyle={styles.formlabel}>Password</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({password: text})}
                        value={this.state.password}
                        placeholder='password'
                        secureTextEntry={true}
                        inputStyle={styles.inputStyle}/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                    <FormLabel labelStyle={styles.formlabel}>Confirm Password</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({password2: text})}
                        value={this.state.password2}
                        placeholder='please type in the same password'
                        secureTextEntry={true}
                        inputStyle={styles.inputStyle}/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>


                    <FormLabel labelStyle={styles.formlabel}>Age</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({age: text})}
                        value={this.state.age}
                        placeholder='Age'
                        inputStyle={styles.inputStyle}/>


                    <FormLabel labelStyle={styles.formlabel}>Current Weight</FormLabel>
                    <FormInput
                        onChangeText={text => this.updateForm({currentWeight: text})}
                        value={this.state.currentWeight}
                        placeholder='Current Weight'
                        inputStyle={styles.inputStyle}/>


                    <Button
                        title='Register'
                        onPress={this.handleSubmit.bind(this)}
                        buttonStyle={styles.button}
                        textStyle={styles.buttonText}
                    />


                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // resizeMode: 'stretch', // or 'cover'
    },
    titleStyle: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 25,
        color: colors.white,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
        marginTop: 20
    },
    button: {
        backgroundColor: colors.green,
        marginTop: 20,
        marginBottom: 20
    },
    buttonText: {
        fontFamily: 'Arial'
    },
    formlabel: {
        color: colors.white,
        fontFamily: 'Arial'
    },
    inputStyle: {
        color: colors.white,
        fontFamily: 'Arial'
    },
})


export default Register