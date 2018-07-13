import React, { Component } from 'react'
import { ScrollView, Picker, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, ListItem } from 'react-native-elements'
import colors from 'Colors';
import {connect} from "react-redux";
import * as actions from "../../actions"


const stateToPropsMapper = state => ({
    foods: state.foods,
    mealType: state.mealType
})

const dispatchToPropsMapper = dispatch => ({
    // findAllFoods: (mealId) => actions.findAllFoods(dispatch, mealId)
    addFoodItem: () =>
        actions.addFoodItem(dispatch, this.name, this.calories)

    // widthChanged: (widgetId, newWidth) =>
    //     actions.widthChanged(dispatch, widgetId, newWidth),
    // linkChanged: (widgetId, newLink) =>
    //     actions.linkChanged(dispatch, widgetId, newLink)
})


class FoodLogEditor extends Component {
    static navigationOptions = {
        title: 'Food Logs Editor'
    }

    updateMealType = (meal) => {
        this.setState({
            mealType: meal
        })
    }
    handleSubmit = () => {
        alert("submit");
    }

    // addFoodItem = () => {
    //     let foodItem = {
    //         name: this.name,
    //         calories: this.calories
    //     }
    //     this.setState({
    //         foodList: [...this.state.foodList, foodItem]}
    //         // () => {
    //         // this.renderFoodList();}
    //     );
    //     this.name.clear();
    //     this.calories.clear();
    //
    //
    // }

    renderFoodList = () => {
        alert('render food list');
        return this.props.foods.map(
            (food, index) => (
                <ListItem
                    key={index}
                    title={food.name}
                    subtitle={food.calories}
                    leftIcon={{name: "close", color: "red"}}
                />))
        this.name.clear();
        this.calories.clear();
    }

    render() {
        return (
            <ScrollView>

                <Text style={styles.text}>
                    Total Number of Food Items ({this.props.foods.length})
                </Text>

                {this.renderFoodList()}

                <FormLabel>Name</FormLabel>
                <FormInput ref={(input) => {this.name = input}}
                           placeholder='What did you eat?'/>

                <FormLabel>Number of Calories</FormLabel>
                <FormInput
                    ref={input => this.calories = input}
                    placeholder='How much calories does it have?'/>

                <Button
                    onPress={this.props.addFoodItem}
                    title='add another food item'
                    buttonStyle={styles.button}></Button>

                <Picker selectedValue = {this.props.mealType} onValueChange = {this.updateMealType}>
                    <Picker.Item label = "breakfast" value = "breakfast" />
                    <Picker.Item label = "lunch" value = "lunch" />
                    <Picker.Item label = "dinner" value = "dinner" />
                    <Picker.Item label = "snacks" value = "snacks" />
                </Picker>

                <Text style = {styles.text}>{this.props.mealType}</Text>

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

// export default FoodLog
const FoodLogContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(FoodLogEditor);

export default FoodLogContainer;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        alignSelf: 'center',
        color: colors.turqoise
    },
    button: {
        backgroundColor: colors.green
    }
})
