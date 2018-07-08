import React, { Component } from 'react'
import { ScrollView, Picker, View, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class WorkoutEditor extends Component {
    static navigationOptions = {
        title: 'WorkoutEditor'
    }

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    handleSubmit = () => {
        alert("submit");
    }

    render() {
        return (
            <ScrollView>
                <Text h3>Workout Entry</Text>

                <FormLabel>Title</FormLabel>
                <FormInput ref={(input) => {this.title = input}}
                           placeholder='What was your workout?'/>

                <FormLabel>Description</FormLabel>
                <FormInput
                    ref={input => this.description = input}
                    placeholder='Describe your workout'/>

                <FormLabel>Duration</FormLabel>
                <FormInput
                    ref={input => this.duration = input}
                    placeholder='How long was your workout?'/>

                <FormLabel>Location</FormLabel>
                <FormInput
                    ref={input => this.location = input}
                    placeholder='Where was your workout?'/>

                <FormLabel>Calories Burned</FormLabel>
                <FormInput
                    ref={input => this.caloriesBurned = input}
                    placeholder='How much calories did you burn?'/>



                <Button
                    onPress={this.handleSubmit}
                    title='Submit'
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
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    }
})

export default WorkoutEditor