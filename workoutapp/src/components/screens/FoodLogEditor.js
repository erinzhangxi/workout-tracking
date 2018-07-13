import React, { Component } from 'react'
import { ScrollView, Picker, View, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, ListItem } from 'react-native-elements'
import colors from 'Colors';

class FoodLogEditor extends Component {
    static navigationOptions = {
        title: 'Food Logs Editor'
    }

    constructor(props) {
        super(props);

        this.state = {
            mealType: 'lunch', // by default
            foodList: []

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

    addFoodItem = () => {
        let foodItem = {
            name: this.name,
            calories: this.calories
        }
        this.setState({
            foodList: [...this.state.foodList, foodItem]}
            // () => {
            // this.renderFoodList();}
        );
        this.name.clear();
        this.calories.clear();


    }

    renderFoodList = () => {
        alert('render food list');
        return this.state.foodList.map(
            (food, index) => (
                <ListItem
                    key={index}
                    title={food.name}
                    leftIcon={{name: "close", color: "red"}}
                />))
    }

    render() {
        return (
            <ScrollView>
                {this.renderFoodList()}
                <Text>{this.state.foodList.length}</Text>

                <FormLabel>Name</FormLabel>
                <FormInput ref={(input) => {this.name = input}}
                           placeholder='What did you eat?'/>

                <FormLabel>Number of Calories</FormLabel>
                <FormInput
                    ref={input => this.calories = input}
                    placeholder='How much calories does it have?'/>

                <Button
                    onPress={this.addFoodItem}
                    title='add another food item'
                    buttonStyle={styles.button}></Button>

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
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    button: {
        backgroundColor: colors.green
    }
})

export default FoodLogEditor