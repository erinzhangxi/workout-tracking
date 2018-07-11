import React, { Component } from 'react'
import { ScrollView, Picker, View, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import colors from 'Colors';
import WorkoutService from "../../services/WorkoutService";
import cookie from "react-cookies";


class WorkoutEditor extends Component {
    static navigationOptions = {
        title: 'WorkoutEditor',
        headerTitleStyle: {
            color: colors.white
            // fontFamily: fonts.montserrat
        },
        headerStyle: {
            backgroundColor: colors.charcoal,
        },
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
                    alert('workout submitted');
                    this.props.navigation.navigate('Home', {userId: this.state.userId});
                })
        }
    }



    updateForm = (newState) => {
        this.setState(newState)
    }

    render() {
        return (
            <ScrollView style={styles.formContainer}>
                <Text h3 style={styles.text}>Add a workout</Text>

                <FormLabel>Title</FormLabel>
                <FormInput  onChangeText={text => this.updateForm({title: text})}
                            value={this.state.title}
                           placeholder='What was your workout?'/>

                <FormLabel>Description</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({description: text})}
                    value={this.state.description}
                    placeholder='Describe your workout'/>

                <FormLabel>Duration</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({duration: text})}
                    value={this.state.duration}
                    placeholder='How long was your workout?'/>

                <FormLabel>Location</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({location: text})}
                    value={this.state.location}
                    placeholder='Where was your workout?'/>

                <FormLabel>Calories Burned</FormLabel>
                <FormInput
                    onChangeText={text => this.updateForm({caloriesBurned: text})}
                    value={this.state.caloriesBurned}
                    placeholder='How much calories did you burn?'/>



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
    text: {
        fontSize: 20,
        alignSelf: 'center',
        color: colors.night
    },
    formContainer: {
        backgroundColor: colors.backgroundLight
    },
    button: {
        backgroundColor: colors.green
    }

})

export default WorkoutEditor