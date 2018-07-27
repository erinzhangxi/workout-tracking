import React, { Component } from 'react'
import { View, ScrollView, Picker, StyleSheet } from 'react-native'
import { Text, Button, Card, Icon, ListItem } from 'react-native-elements'
import cookie from "react-cookies";
import FoodService from "../../services/FoodService";

import Animation from 'lottie-react-native';
import stars from '../../assets/animations/5_stars.json';


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
        this.animation.play();
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
            <ScrollView>

                <Card
                    title={this.state.title}
                    image={require('../../assets/images/meal-placeholder.jpg')}>
                    <Text style={styles.fontStyle}>
                        Meal Details
                    </Text>

                    <Text style={styles.fontStyle}>
                        {this.state.date}
                    </Text>
                    <Text style={styles.fontStyle}>
                        {this.state.type}
                    </Text>
                    {/*<Text style={{marginBottom: 10}}>*/}
                    {/*Length:  {this.state.foods.length}*/}
                    {/*</Text>*/}

                    /* Foods detail goes here */
                    {this.renderFoodList()}
                    <View style={styles.animationContainer}>
                        <Animation
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={styles.animation}
                            loop={true}
                            source={stars}
                        />
                    </View>

                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='red'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Delete'
                        onPress={params.handleDelete}/>
                </Card>

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    animationContainer: {
        width: 150,
        height: 80
    },
    animation: {
        width: 150,
        height: 80
    },
    fontStyle: {
        fontFamily: 'Arial',
        marginBottom: 10
    }

});


export default MealDetails;

