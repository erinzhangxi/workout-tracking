import React, { Component } from 'react'
import {ScrollView, View, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import FoodLogEditor from "./FoodLogEditor";
import FoodService from "../../services/FoodService";
import cookie from "react-cookies";
import MealItem from '../../elements/MealItem'
import ModalDropdown from 'react-native-modal-dropdown';

class FoodLog extends Component {
    static navigationOptions = {
        title: 'Food Logs',
        headerTitleStyle: {
            color: colors.white
        },
        headerStyle: {
            backgroundColor: colors.charcoal,
        },
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon size={24} color="#611dce" name='food-apple' />;
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            meals: [],  // meals for the day
            userId: null
        }
        this.foodService = FoodService.instance;
    }

    componentWillMount = () => {
        var userCookie = cookie.load('user');
        if(userCookie) {
            // this.setProfile(user.username, user.age, user.currentWeight);
            this.setState({
                userId: userCookie._id
            });
        }
    }
    componentDidMount = () => {
        if (this.state.userId) {
            this.fetchMealsForUser(this.state.userId);
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.userId) {
            this.fetchMealsForUser(this.state.userId);
        }
    }

    fetchMealsForUser = (userId) => {
        if (userId) {
            this.foodService
                .findMealsForUser(userId)
                .then((meals) => {
                    this.setMeals(meals)
                });
        }
    }

    setMeals = (meals) => {
        if (meals) {
            this.setState({
                meals: meals
            });
        }
    }

    handleAddMeal = () => {
        this.props.navigation.navigate('FoodLogEditor');
    }

    deleteMeal = (mealId) => {
        let newMeals;
        this.foodService
            .deleteMeal(this.state.userId, mealId)
            .then(() => {
                newMeals = this.renderMealsForUser()
            });
        this.props.navigation.navigate('FoodLog', {meals: newMeals});
    }

    // renderBreakfasts = () => {
    //     //     return  <Text h4 style={{color:'#565656'}}>Breakfast </Text>
    //     // }
    //     //
    //     // renderLunches = () => {
    //     //     return <Text h4 style={{color:'white'}}>Lunch </Text>
    //     // }
    //     //
    //     // renderDinners = () => {
    //     //     return  <Text h4 style={{color:'#565656'}}>Dinner </Text>
    //     // }

    renderMealsForUser = () => {
        return (
            this.state.meals.map((meal, index) => {
                return <MealItem key={index}
                                 id={meal}
                                 navigation={this.props.navigation}
                                 handleDelete={()=>this.deleteMeal(meal)}
                                />
            })
        )
    }


    render() {
        return (
            <View style={styles.homeContainer}>

                <View style={styles.header}>
                    <ModalDropdown
                        dropdownTextStyle={styles.dropdownText}
                        options={['Today', 'This week', "This month", "Earlier"]}>
                        <Text h4 style={styles.titleFont}>Today </Text>
                    </ModalDropdown>
                    <Button title='+'
                            backgroundColor= {colors.lightcharcoal}
                            onPress={this.handleAddMeal}></Button>
                </View>
                {/*<View style={styles.MealContainerStyleOne}>*/}
                {/*{this.renderBreakfasts()}*/}
                {/*</View>*/}
                {/*<View style={styles.MealContainerStyleTwo}>*/}

                {/*{this.renderLunches()}*/}
                {/*</View>*/}
                {/*<View style={styles.MealContainerStyleOne}>*/}

                {/*{this.renderDinners()}*/}
                {/*</View>*/}
                <ScrollView style={styles.mealListContent}>

                    <View>
                        <Text style={styles.paragraph}>Number of meals: {this.state.meals.length}</Text>
                    </View>

                    {this.renderMealsForUser()}

                </ScrollView>
                {/*<BottomNavBar/>*/}
            </View>
        )
    }
}

export default FoodLog

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column'
        // justifyContent: 'space-between',
        // padding: 20
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightcharcoal,
        flexDirection: 'row'
    },
    MealContainerStyleOne: {
        flex: 2,
        backgroundColor: colors.ypsLight

    },
    MealContainerStyleTwo: {
        flex: 2,
        backgroundColor: colors.ypsDark
    },
    titleFont: {
        color: colors.white,
        fontSize: 16
    },
    mealListContent: {
        backgroundColor: colors.white,
    },
    dropdownText: {
        color: 'black',
        fontSize: 16
    },
    paragraph: {
        color: colors.green,
        fontSize: 15
    }
})
