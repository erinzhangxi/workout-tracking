import React, { Component } from 'react'
import { ScrollView, ImageBackground, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import colors from 'Colors';
import WorkoutService from "../../services/WorkoutService";
import cookie from "react-cookies";
import TrophyScreen from "./TrophyScreen";
import BackButton from '../../elements/BackButton.js'
import bg from '../../assets/images/editor.png';

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
            <ImageBackground source={bg} style={styles.backgroundImage}>
                <ScrollView>
                    <BackButton page='Home'/>
                    <Text h3 style={styles.titleFont}>Add a workout</Text>
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
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    titleFont: {
        fontFamily: 'Arial',
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    button: {
        marginTop: 10,
        backgroundColor: colors.green,
        marginBottom: 20
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