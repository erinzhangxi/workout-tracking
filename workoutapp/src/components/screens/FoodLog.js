import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';

class FoodLog extends Component {
    static navigationOptions = {
        title: 'Food Logs',
        headerTitleStyle: {
            color: colors.white
        },
        headerStyle: {
            backgroundColor: colors.black
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
        }
    }

    componentDidMount() {

    }

    handleAddMeal = () => {
        this.props.navigation.navigate('FoodLogEditor');
    }


    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={[styles.boxContainer, styles.header]}>
                    <Text h4 style={{color: 'white'}}>Today </Text>
                    <Button title='+'
                            backgroundColor= {colors.gray}
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
    }
})


export default FoodLog