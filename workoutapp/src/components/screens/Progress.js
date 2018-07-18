import React, { Component } from 'react'
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import BottomNavBar from '../../elements/BottomNavBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import cookie from "react-cookies";

class Progress extends Component {
    static navigationOptions = {
        title: 'Progress',
        headerTitleStyle: {
            color: colors.white
        },
        headerStyle: {
            backgroundColor: colors.charcoal
        },
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon size={24} color="#611dce" name='chart-line' />;
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

    componentWillMount() {
        var user = cookie.load('user');
        if(user) {
            this.setProfile(user.username, user.weights, user.currentWeight);
        }
    }

    setProfile = (username, weights, currentWeight) => {
        this.setState({
            username: username,
            weights: weights,
            currentWeight: currentWeight
        })
    }

    componentDidMount() {
    }


    renderWeightStats = () => {

        return (
            <View style={styles.statsContainer}>
                <View>
                    <Text h4 style={styles.statsFont}>Current Weight</Text>
                </View>
                <View >
                    <Text h4 style={styles.statsFont}>{this.state.currentWeight}</Text>
                </View>
            </View>
        )
    }

    render() {

        return (
            <View style={styles.homeContainer}>
                {this.renderWeightStats()}

                <View style={[styles.boxContainer, styles.MealContainerStyleTwo]}>

                    <Text h4 style={{color:'white'}}>Progress Chart </Text>
                    <Text h4> Number of Weights Recorded: ({this.state.weights.length})</Text>

                </View>
                <View style={[styles.boxContainer, styles.MealContainerStyleOne]}>

                    <Text h4 style={{color:colors.white}}>From Goal </Text>
                </View>

                <Button
                    onPress={()=> this.props.navigation.navigate('WeightList')}
                    title='View Weight History'
                    buttonStyle={styles.button}
                />
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.charcoal
        // justifyContent: 'space-between',
        // padding: 20
    },
    boxContainer: {
        flex: 1
    },
    statsContainer: {
        flex: 2,
        backgroundColor: colors.yps,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    MealContainerStyleTwo: {
        flex: 5,
        backgroundColor: colors.ypsLight
    },
    MealContainerStyleOne: {
        flex: 2,
        backgroundColor: colors.ypsDark
    },
    statsFont: {
        color: colors.white,
        fontSize: 17
    },
    button: {
        backgroundColor: colors.green

    }
})



export default Progress