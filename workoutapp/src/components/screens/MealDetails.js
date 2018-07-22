import React, { Component } from 'react'
import { View, Picker, StyleSheet } from 'react-native'
import { Text, Button, Card, Icon, ListItem } from 'react-native-elements'
import cookie from "react-cookies";
import FoodService from "../../services/FoodService";


class MealDetails extends Component {
    static navigationOptions = {
        title: 'Meal Details'
    }

    constructor(props) {
        super(props);

        this.state = {

        }
        this.foodService = FoodService.instance;
    }


    componentWillMount() {
        var user = cookie.load('user');
        if(user) {
            this.setState({userId: user._id});
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const mealId = navigation.getParam("mealId")
        // fetch from server
        this.foodService
            .findMealById(mealId)
            .then(res => {
                this.setState({
                    mealId: mealId,
                    date: res.date,
                    type: res.type,
                    foods: res.foods
                });
            })
    }

    renderFoodList = () => {
        // let foodlist = null;
        // foodlist = this.state.foods.map(function (food) {
        //     return <ListItem key={index}
        //                      title={food.name}
        //                      subtitle={food.calories}></ListItem>
        //
        // })
        //
        // return foodlist;
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>

                <Card
                    title={this.state.title}
                    image={require('../../assets/images/meal-placeholder.jpg')}>
                    <Text style={{marginBottom: 10}}>
                        Meal Details
                    </Text>

                    <Text style={{marginBottom: 10}}>
                        {this.state.date}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        {this.state.type}
                    </Text>
                    {/*<Text style={{marginBottom: 10}}>*/}
                      {/*Length:  {this.state.foods.length}*/}
                    {/*</Text>*/}

                    /* Foods detail goes here */
                    {this.renderFoodList()}

                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='red'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Delete'
                        onPress={params.handleDelete}/>
                </Card>

            </View>
        )
    }
}

export default MealDetails;

