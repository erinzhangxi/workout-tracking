import React, { Component } from 'react'
import { ImageBackground, ScrollView, View } from 'react-native';
import { Button, FormLabel, FormInput, Text } from 'react-native-elements'
import cookie from "react-cookies";
import UserService from "../../services/UserService";
import {styles} from "./Login";
import BackButton from '../../elements/BackButton.js'
import gears from '../../assets/animations/gears.json';
import Animation from 'lottie-react-native';
import bg from '../../assets/images/editor.png';

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

    componentDidMount = () => {
        this.animation.play();
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
            <ImageBackground source={bg} style={styles.backgroundImage}>
                <ScrollView>
                    <BackButton page='Profile'/>
                    <View style={styles.profilePageHeader}>
                        <Text h3 style={styles.titleTextDarkBackground}>Edit Profile</Text>
                        <View style={styles.gearsContainer}>
                            <Animation
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                style={styles.gear}
                                loop={true}
                                source={gears}
                            />
                        </View>
                    </View>
                    <FormLabel labelStyle={styles.formlabel}>Name</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({username: text})}
                                value={this.state.username}
                                placeholder='username'
                                inputStyle={styles.profileInputStyle}
                                containerStyle={styles.containerStyle}/>

                    <FormLabel labelStyle={styles.formlabel}>Email</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({email: text})}
                                value={this.state.email}
                                placeholder='email'
                                inputStyle={styles.profileInputStyle}
                                containerStyle={styles.containerStyle}/>

                    <FormLabel labelStyle={styles.formlabel}>Age</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({age: text})}
                                value={this.state.age}
                                placeholder='age'
                                inputStyle={styles.profileInputStyle}
                                containerStyle={styles.containerStyle}/>

                    <FormLabel labelStyle={styles.formlabel}>Current Weight</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({currentWeight: text})}
                                value={this.state.currentWeight}
                                placeholder='current weight'
                                inputStyle={styles.profileInputStyle}
                                containerStyle={styles.containerStyle}/>

                    <FormLabel labelStyle={styles.formlabel}>Height</FormLabel>
                    <FormInput  onChangeText={text => this.updateForm({height: text})}
                                value={this.state.height}
                                placeholder='current height'
                                inputStyle={styles.profileInputStyle}
                                containerStyle={styles.containerStyle}/>

                    <Button
                        onPress={this.updateProfile}
                        title='Save'
                        buttonStyle={styles.button}
                    />

                </ScrollView>
            </ImageBackground>
        )
    }
}

export default EditProfile;
