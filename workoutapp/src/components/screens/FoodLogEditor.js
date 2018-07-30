import React, { Component } from 'react'
import { View, ScrollView, Picker, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, ListItem } from 'react-native-elements'
import colors from 'Colors';
import {connect} from "react-redux";
import * as actions from "../../actions"
import cookie from "react-cookies";
import BackButton from '../../elements/BackButton.js'


const stateToPropsMapper = state => ({
    foods: state.foods
})

const dispatchToPropsMapper = dispatch => ({
    findAllFoodsForMeal: (mealId) => actions.findAllFoodsForMeal(dispatch, mealId),
    addFoodItem: (name, calories) =>
        actions.addFoodItem(dispatch, name, calories),
    submitMeal: (foods, mealType, userId) =>
        actions.submitMeal(dispatch, foods, mealType, userId)
})


class FoodLogEditor extends Component {
    static navigationOptions = {
        title: 'Food Logs Editor',
        headerTitleStyle: {
            color: colors.charcoal
        },
        headerStyle: {
            backgroundColor: colors.white,
        },
    }

    state = {
        currentFoodName: '',
        currentFoodCalories: '',
        userId: null,
        mealType: ''
    }


    componentWillMount() {
        var user = cookie.load('user');
        if (user) {
            this.setState({
                userId: user._id
            })
        }
    }

    updateMealType = (meal) => {
        this.setState({
            mealType: meal
        })
    }
    handleSubmit = () => {
        this.props.submitMeal(this.props.foods, this.state.mealType, this.state.userId);
        alert('Meal added!');

        // TODO how to use call back in react native (redux-thunk)
        // get the newly created meal ID and use as a param in the method below
        // this.props.navigation.navigate('FoodLog', {meals: this.props.findAllFoodsForMeal(mealId)});
        this.props.navigation.navigate('FoodLog');
    }

    // goBack = () => {
    //     this.props.navigation.navigate('FoodLog');
    // }

    updateForm = (newState) => {
        this.setState(newState)
    }

    renderFoodList = () => {
        if (this.props.foods.length > 0) {
            return this.props.foods.map(
                (food, index) => (
                    <ListItem key={index}
                              title={food.name}
                              subtitle={food.calories}/>
                ))
        }
    }

    render() {
        return (
            <ScrollView style={styles.mainContainer}>


                <BackButton page='FoodLog'/>

                <Text h3 style={styles.titleFont}>Add a Meal</Text>
                {this.renderFoodList()}

                <FormLabel labelStyle={styles.formlabel}>Name</FormLabel>
                {/*<FormInput*/}
                {/*onChangeText={text => this.setFoodName(text)}*/}
                {/*placeholder='What did you eat?'/>*/}

                <FormInput
                    ref={input => this.foodName = input}
                    onChangeText={text => this.updateForm({currentFoodName: text})}
                    placeholder='What did you eat?'
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}/>

                <FormLabel labelStyle={styles.formlabel}>Number of Calories</FormLabel>
                {/*<FormInput*/}
                {/*onChangeText={text => this.props.setFoodCalories(text)}*/}
                {/*placeholder='How much calories does it have?'/>*/}
                <FormInput
                    ref={input => this.foodCalories = input}
                    onChangeText={text => this.updateForm({currentFoodCalories: text})}
                    placeholder='How much calories does it have?'
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.containerStyle}
                />

                <Button
                    onPress={()=>
                        this.props.addFoodItem(this.state.currentFoodName, this.state.currentFoodCalories)}
                    title='add another food item'
                    buttonStyle={styles.button}></Button>


                <Picker selectedValue = {this.state.mealType}
                        onValueChange = {this.updateMealType}
                        itemStyle={styles.pickerItem}>
                    <Picker.Item label = "breakfast" value = "breakfast" />
                    <Picker.Item label = "lunch" value = "lunch" />
                    <Picker.Item label = "dinner" value = "dinner" />
                    <Picker.Item label = "snacks" value = "snacks" />
                </Picker>

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
    mainContainer: {
        backgroundColor: colors.darkGreen
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
        backgroundColor: colors.green,
        marginTop: 10,
        marginBottom: 20
    },
    animationContainer:{
        width: 100,
        height: 100
    },
    animation: {
        width: 100,
        height: 100
    },
    formlabel: {
        color: colors.white,
        fontFamily: 'Arial'
    },
    inputStyle: {
        color: colors.charcoal,
        fontFamily: 'Arial'
    },
    containerStyle: {
        backgroundColor: colors.white,
        color: colors.green
    },
    pickerItem:{
        color: colors.white,
        fontSize:15,
        fontFamily: 'Arial'
    }
})
