import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import colors from 'Colors';
import WorkoutService from "../../services/WorkoutService";
import cookie from "react-cookies";
import TrophyScreen from "./TrophyScreen";
import BackButton from '../../elements/BackButton.js'

class WorkoutEditor extends Component {
    static navigationOptions = {
        title: 'WorkoutEditor'
    }

    constructor(props) {
        super(props);

        this.state = {
            // title: null,
            // description: null,
            // duration: null,
            // location: null,
            // caloriesBurned: 0,
            // userId: null
        }
        this.workoutService = WorkoutService.instance;
    }

    componentDidMount() {
        var userCookie = cookie.load('user');
        if(userCookie) {
            // this.setProfile(user.username, user.age, user.currentWeight);
            this.setState({
                userId: userCookie._id
            });
        }
    }
    handleSubmit = () => {
        if (this.state) {

            let workout = {
                time: new Date().toLocaleString(),
                duration: this.state.duration,
                title: this.state.title,
                description: this.state.description,
                location: this.state.location,
                caloriesBurned: this.state.caloriesBurned
            }

            this.workoutService
                .createWorkout(workout, this.state.userId)
                .then(res => {
                    this.props.navigation.navigate('TrophyScreen', {userId: this.state.userId});
                })
        }

    }


    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <ScrollView style={styles.formContainer}>
                <BackButton page='Home'/>
                <FormLabel labelStyle={styles.formlabel}>Title</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({title: text})}
                            value={this.state.title}
                            placeholder='What was your workout?'
                            inputStyle={styles.inputStyle}
                            containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Description</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({description: text})}
                    value={this.state.description}
                    placeholder='Describe your workout'
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Duration</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({duration: text})}
                    value={this.state.duration}
                    placeholder='How long was your workout?'
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Location</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({location: text})}
                    value={this.state.location}
                    placeholder='Where was your workout?'
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Calories Burned</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({caloriesBurned: text})}
                    value={this.state.caloriesBurned}
                    placeholder='How much calories did you burn?'
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}/>



                <Button
                    onPress={this.handleSubmit}
                    title='Submit'
                    buttonStyle={styles.button}
                />

                {/*dropdown to choose from three meals*/}

                {/*<FormLabel>Password</FormLabel>*/}
                {/*<FormInput*/}
                {/*ref={input => this.password = input}*/}
                {/*placeholder='password'/>*/}
                {/*<FormValidationMessage>{'This field is required'}</FormValidationMessage>*/}

                {/*<FormLabel>Confirm Password</FormLabel>*/}
                {/*<FormInput*/}
                {/*ref={input => this.password2 = input}*/}
                {/*placeholder='please type in the same password'/>*/}
                {/*<FormValidationMessage>{'This field is required'}</FormValidationMessage>*/}

                {/*<Button*/}
                {/*title='Register'*/}
                {/*onPress={this.handleSubmit.bind(this)}/>*/}

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    // text: {
    //     fontSize: 20,
    //     alignSelf: 'center',
    //     color: colors.night,
    //     fontFamily: 'Arial',
    // },
    formContainer: {
        backgroundColor: colors.darkGreen
    },
    button: {
        marginTop: 10,
        backgroundColor: colors.green
    },
    inputStyle: {
        color: colors.charcoal,
        fontFamily: 'Arial'
    },
    containerStyle: {
        backgroundColor: colors.white,
        color: colors.green
    },
    formlabel: {
        color: colors.white,
        fontFamily: 'Arial'
    }

})

export default WorkoutEditor