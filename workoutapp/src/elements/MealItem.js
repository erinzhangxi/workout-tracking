import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import FoodService from "../services/FoodService";

// given a meal id, fetch meal from server and render the meal item
class MealItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foods: [],
            type: '',
            date: ''
        }
        this.foodService = FoodService.instance;
    }

    componentWillMount() {
        this.foodService
            .findMealById(this.props.id)
            .then(res => {
                this.setState({
                    foods: res.foods,
                    type: res.type,
                    date: res.date
                })
            })
    }
    render() {
        // let foodlist;
        // this.state.foods.map((food, index) => {
        //     return <MealItem id={meal}/>
        // })
        return (
            <ListItem title={this.state.date}
                      subtitle={this.state.type}
                      onPress={() => this.props.navigation.navigate("MealDetails", {
                              mealId: this.props.id,
                              handleDelete: this.props.handleDelete})}/>
        )
    }
}

export default MealItem;
