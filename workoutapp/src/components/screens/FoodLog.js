import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HEADER_COLOR = '#CE6D39';

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
        }
    }

    componentDidMount() {

    }

    handleAddMeal = () => {
        alert("add meal");
        this.props.navigation.navigate('Food Log Editor');
    }


    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={[styles.boxContainer, styles.header]}>
                    <Text h4 style={{color: 'white'}}>Today </Text>
                    <Button title='+'
                            backgroundColor={HEADER_COLOR}
                            onPress={this.handleAddMeal}></Button>
                </View>
                <View style={[styles.boxContainer, styles.MealContainerStyleOne ]}>
                    {/*<Meal/>*/}
                    <Text h4 style={{color:'#565656'}}>Breakfast </Text>

                </View>
                <View style={[styles.boxContainer, styles.MealContainerStyleTwo]}>

                    <Text h4 style={{color:'white'}}>Lunch </Text>
                </View>
                <View style={[styles.boxContainer, styles.MealContainerStyleOne]}>

                    <Text h4 style={{color:'#565656'}}>Dinner </Text>
                </View>


                {/*<BottomNavBar/>*/}
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column'
        // justifyContent: 'space-between',
        // padding: 20
    },
    boxContainer: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: HEADER_COLOR,
        flexDirection: 'row'
    },
    MealContainerStyleOne: {
        flex: 2,
        backgroundColor: '#FFEEE4'

    },
    MealContainerStyleTwo: {
        flex: 2,
        backgroundColor: '#F17F42'
    }
})


export default FoodLog