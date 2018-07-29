import React, { Component } from 'react'
import { ScrollView } from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements'
import cookie from "react-cookies";
import UserService from "../../services/UserService";
import colors from 'Colors';
import {styles} from "./Login";
import BackButton from '../../elements/BackButton.js'

class EditProfile extends Component {
    static navigationOptions = {
        title: 'Edit Profile'
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
            <ScrollView style={styles.profileContainer}>
                <BackButton page='Profile'/>
                <FormLabel labelStyle={styles.formlabel}>Name</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({username: text})}
                            value={this.state.username}
                            placeholder='username'
                            inputStyle={styles.inputStyle}
                            containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Email</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({email: text})}
                            value={this.state.email}
                            placeholder='email'
                            inputStyle={styles.inputStyle}
                            containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Age</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({age: text})}
                            value={this.state.age}
                            placeholder='age'
                            inputStyle={styles.inputStyle}
                            containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Current Weight</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({currentWeight: text})}
                            value={this.state.currentWeight}
                            placeholder='current weight'
                            inputStyle={styles.inputStyle}
                            containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Height</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({height: text})}
                            value={this.state.height}
                            placeholder='current height'
                            inputStyle={styles.inputStyle}
                            containerStyle={styles.containerStyle}/>

                <Button
                    onPress={this.updateProfile}
                    title='Save'
                    buttonStyle={styles.button}
                />

            </ScrollView>
        )
    }
}

export default EditProfile;
