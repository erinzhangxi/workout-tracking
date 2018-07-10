import React, { Component } from 'react'
import { ScrollView, Picker, View, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import colors from 'Colors';

class FoodLogEditor extends Component {
    static navigationOptions = {
        title: 'Food Logs Editor'
    }

    constructor(props) {
        super(props);

        this.state = {
            mealType: 'lunch' // by default
        }
    }
    updateMealType = (meal) => {
        this.setState({
            mealType: meal
        })
    }
    handleSubmit = () => {
        alert("submit");
    }

    render() {
        return (
            <ScrollView>
                <Text h3>Meal Entry</Text>

                <FormLabel>Name</FormLabel>
                <FormInput ref={(input) => {this.name = input}}
                           placeholder='What did you eat?'/>

                <FormLabel>Number of Calories</FormLabel>
                <FormInput
                    ref={input => this.calories = input}
                    placeholder='How much calories does it have?'/>

                <Picker selectedValue = {this.state.mealType} onValueChange = {this.updateMealType}>
                    <Picker.Item label = "breakfast" value = "breakfast" />
                    <Picker.Item label = "lunch" value = "lunch" />
                    <Picker.Item label = "dinner" value = "dinner" />
                    <Picker.Item label = "snacks" value = "snacks" />
                </Picker>

                <Text style = {styles.text}>{this.state.mealType}</Text>

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

export default FoodLogEditor