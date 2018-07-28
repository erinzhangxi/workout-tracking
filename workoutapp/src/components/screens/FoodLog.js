import React, { Component } from 'react'
import {ScrollView, View, StyleSheet} from 'react-native';
import { Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import FoodLogEditor from "./FoodLogEditor";
import FoodService from "../../services/FoodService";
import cookie from "react-cookies";
import MealItem from '../../elements/MealItem'
import ModalDropdown from 'react-native-modal-dropdown';
import AddButton from '../../elements/AddButton'

class FoodLog extends Component {
    static navigationOptions = {
        title: 'Food Logs',
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
            // breakfasts: [],
            // lunches: [],
            // dinners: [],
            // snacks: [],
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
    checkMealType = (mealId) => {
        this.foodService
            .findMealById(mealId)
            .then(res => {
                return res.type;
            })
    }

    // meals are a list of meal IDs
    setMeals = (meals) => {
        // let mapIDsToMeals = (mealId) => {
        //     return  this.foodService
        //         .findMealById(mealId)
        //         .then(res => {
        //             console.log(res.type);
        //             return res.type
        //         });
        // };
        //
        // let isBreakfast = (mealType) => {
        //     console.log(mealType);
        //     console.log(mealType === 'breakfast');
        //     return mealType === 'breakfast';
        // };
        //
        // let breakfastList = (breakfasts, meal) => {
        //     return breakfasts.push(meal);
        // };

        if (meals) {
            // let filteredBreakfastList = meals
            //     .map(mapIDsToMeals)
            //     .filter(isBreakfast)
            //     .reduce(breakfastList, []);

            this.setState({
                meals: meals
                // lunches: lunches,
                // dinners: dinners,
                // snacks: snacks
            })
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

    renderMealsForUser = (meals) => {
        return (
            meals.map((meal, index) => {
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
                </View>

                <ScrollView style={styles.mealListContent}>

                    {this.renderMealsForUser(this.state.meals)}

                    {/*<Divider style={styles.divider}/>*/}
                    {/*<View>*/}
                        {/*<Text style={styles.paragraph}>Breakfast: {this.state.breakfasts.length}</Text>*/}
                    {/*</View>*/}
                    {/*{this.renderMealsForUser(this.state.breakfasts)}*/}


                    {/*<Divider style={styles.divider}/>*/}
                    {/*<View>*/}
                        {/*<Text style={styles.paragraph}>Lunch: {this.state.lunches.length}</Text>*/}
                    {/*</View>*/}
                    {/*{this.renderMealsForUser(this.state.lunches)}*/}

                    {/*<Divider style={styles.divider}/>*/}
                    {/*<View>*/}
                        {/*<Text style={styles.paragraph}>Dinner: {this.state.dinners.length}</Text>*/}
                    {/*</View>*/}
                    {/*{this.renderMealsForUser(this.state.dinners)}*/}
                    <AddButton addAction={this.handleAddMeal}/>

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
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkGreen,
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
        fontSize: 14,
        fontFamily: 'Arial'
    },
    mealListContent: {
        backgroundColor: colors.white,
    },
    dropdownText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'Arial'
    },
    paragraph: {
        color: colors.green,
        fontSize: 18,
        fontFamily: 'Arial'
    },
    divider: {
        backgroundColor: colors.lightgray,
        height: 2
    }
})
