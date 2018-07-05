import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props);

    }
    handleSubmit() {
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <ScrollView>
                {/*<FixedHeader/>*/}
                <View style={styles.homeContainer}>
                    <FormLabel>Username</FormLabel>
                    <FormInput ref={(input) => {this.username = input}}
                               placeholder='username'
                               containerStyle={styles.inputContainer}
                               inputStyle={styles.inputBox}/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>

                    <FormLabel>Password</FormLabel>
                    <FormInput
                        ref={input => this.password = input}
                        placeholder='password'
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.inputBox}/>
                    <FormValidationMessage>{'This field is required'}</FormValidationMessage>
                    <Button
                        title='Login'
                        onPress={this.handleSubmit.bind(this)}/>
                    <Text>Don't have an account?
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
    inputBox: {
        height: 60,
        backgroundColor: "#fff",
        borderColor: "#6495ED",
        borderWidth: 2,
        borderRadius: 15
    },
    inputContainer: {
        backgroundColor: '#fff',
        borderRadius: 6,
        marginBottom: 10,
        height: 56
    },
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Login