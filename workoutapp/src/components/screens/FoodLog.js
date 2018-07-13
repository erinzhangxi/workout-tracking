import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import { connect } from "react-redux";

const stateToPropsMapper = state => ({
    meals: state.meals
})

const dispatchToPropsMapper = dispatch => ({
    // headingSizeChanged: (widgetId, newSize) =>
    //     actions.headingSizeChanged(dispatch, widgetId, newSize),
    // textChanged: (widgetId, newText) =>
    //     actions.textChanged(dispatch, widgetId, newText),
    // listTypeChanged: (widgetId, newType) =>
    //     actions.listTypeChanged(dispatch, widgetId, newType),
    // imageChanged: (widgetId, newImage) =>
    //     actions.imageChanged(dispatch, widgetId, newImage),
    // widthChanged: (widgetId, newWidth) =>
    //     actions.widthChanged(dispatch, widgetId, newWidth),
    // linkChanged: (widgetId, newLink) =>
    //     actions.linkChanged(dispatch, widgetId, newLink)
})

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
            meals: []  // meals for the day
        }
    }

    /* */
    componentWillMount = () => {

    }

    componentDidMount = () => {

    }

    handleAddMeal = () => {
        this.props.navigation.navigate('FoodLogEditor');
    }

    // renderBreakfasts = () => {
    //     return  <Text h4 style={{color:'#565656'}}>Breakfast </Text>
    // }
    //
    // renderLunches = () => {
    //     return <Text h4 style={{color:'white'}}>Lunch </Text>
    // }
    //
    // renderDinners = () => {
    //     return  <Text h4 style={{color:'#565656'}}>Dinner </Text>
    // }

    renderMealForTheDay = () => {
        return (
            this.state.meals.map((meal, index) => {
                return <ListItem title='index'></ListItem>
        })
        )
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={styles.header}>
                    <Text h4 style={styles.titleFont}>Today </Text>
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

                {this.renderMealForTheDay()}


                {/*<BottomNavBar/>*/}
            </View>
        )
    }
}

// export default FoodLog
const FoodLogContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(FoodLog);

export default FoodLogContainer;

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
})
