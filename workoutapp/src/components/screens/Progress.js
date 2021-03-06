import React, { Component } from 'react'
import {View, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, ListItem, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import cookie from "react-cookies";
import { LineChart, Grid } from 'react-native-svg-charts'
import Animation from 'lottie-react-native';
import clock from '../../assets/animations/stopwatch.json';
import progress from '../../assets/images/progress.png';

class Progress extends Component {
    static navigationOptions = {
        title: 'Progress',
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
                {/*<View style={styles.animationContainer}>*/}
                {/*<Animation*/}
                {/*ref={animation => {*/}
                {/*this.animation = animation;*/}
                {/*}}*/}
                {/*style={styles.animation}*/}
                {/*loop={true}*/}
                {/*source={heart}*/}
                {/*/>*/}
                {/*</View>*/}

                <Card title='current Weight'>
                    <Text h4 style={styles.statsFont}>{this.state.currentWeight} lbs</Text>
                </Card>
            </View>


        )
    }

    render() {
        return (
            <ImageBackground source={progress} style={styles.backgroundImage}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text h4 style={styles.titleFont}>Progress</Text>
                    </View>

                    <Card
                        title='QUOTE OF THE DAY'>
                        <Text style={styles.quoteFont}>
                            Today is another chance. Make yourself proud.
                        </Text>

                        <View style={styles.animationContainer}>
                            <Animation
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                style={styles.animation}
                                loop={true}
                                source={clock}
                            />
                        </View>

                    </Card>

                    {this.renderWeightStats()}
                    <View style={[styles.boxContainer, styles.MealContainerStyle]}>

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
                </ScrollView>
            </ImageBackground>
        )
    }
}

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    titleFont: {
        color: colors.white,
        fontSize: 20,
        fontFamily: 'Arial',
        marginTop: 40,
        fontWeight: 'bold'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxContainer: {
        flex: 1
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
        fontFamily: 'Arial'
    },
    button: {
        backgroundColor: colors.green,
        marginBottom: 20
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
    quoteFont: {
        marginBottom: 12,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: colors.ypsDark
    }
})



export default Progress