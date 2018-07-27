import React, { Component } from 'react'
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import BottomNavBar from '../../elements/BottomNavBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import cookie from "react-cookies";
import { LineChart, Grid } from 'react-native-svg-charts'
import Animation from 'lottie-react-native';
import heart from '../../assets/animations/heart_rate.json';

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
            weightRawData: []
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
        this.animation.play();
        let data = [];
        this.state.weights.map((weight, index) => {
            data.push(weight.weight);
        })
        this.setState({
            weightRawData: data
        }, ()=> console.log('raw weight data' + data))
    }


    renderWeightStats = () => {

        return (

                <View>
                    <View style={styles.animationContainer}>
                        <Animation
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={styles.animation}
                            loop={true}
                            source={heart}
                        />
                    </View>

                    <View style={styles.statsContainer}>
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

                <View style={[styles.boxContainer, styles.MealContainerStyle]}>

                    <Text h4 style={{color: colors.ypsLight}}>Progress </Text>

                    <LineChart
                        style={{ height: 200 }}
                        data={ this.state.weightRawData }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid/>
                    </LineChart>

                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={()=> this.props.navigation.navigate('WeightList')}
                        title='View Weight History'
                        buttonStyle={styles.button}
                    />
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white
    },
    boxContainer: {
        flex: 1
    },
    statsContainer: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center'
    },
    MealContainerStyle: {
        flex: 5,
        backgroundColor: colors.white,
        marginLeft: 20,
        marginRight: 20
    },
    statsFont: {
        color: colors.yps,
        fontSize: 17,
        fontFamily: 'Arial',
    },
    button: {
        backgroundColor: colors.green
    },
    buttonContainer: {
        backgroundColor: colors.white
    },
    animationContainer: {
        width: 300,
        height: 100,
        flexDirection: 'column',
    },
    animation: {
        width: 300,
        height: 100
    },
})



export default Progress