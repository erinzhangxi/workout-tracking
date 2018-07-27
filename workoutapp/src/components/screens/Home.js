import React, { Component } from 'react'
import {View, ScrollView, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import WorkoutItem from './../../elements/WorkoutItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import cookie from "react-cookies";

class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        headerTitleStyle: {
            color: colors.white
            // fontFamily: fonts.montserrat
        },
        headerStyle: {
            backgroundColor: colors.charcoal,
        },
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon size={24} color="#611dce" name='home-variant' />;
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            workouts: [],
            totalDuration: 0,
            caloriesBurned: 0
        }
        this.workoutService = workoutService.instance;
    }

    componentWillMount() {
        var user = cookie.load('user');
        if (user) {
            this.setState({
                username: user.username,
                userId: user._id
            })
        }
    }

    componentDidMount() {
        if (this.state.userId) {
            this.fetchWorkoutsForUser(this.state.userId);
        }
    }
    componentWillReceiveProps(newProps) {
        if (this.state.userId) {
            this.fetchWorkoutsForUser(this.state.userId);
        }
    }


    fetchWorkoutsForUser = (userId) => {
        if (userId) {
            this.workoutService
                .findWorkoutsForUser(userId)
                .then((workouts) => {
                    this.setWorkouts(workouts)
                });
        }
    }

    handleAddWorkout = () => {
        this.props.navigation.navigate("WorkoutEditor");
    }
    setWorkouts = (workouts) => {
        if (workouts) {
            this.setState({
                workouts: workouts
            });
        }
    }
    logout = () => {
        this.props.navigation.navigate("Login");
    }

    renderWorkoutStats = () => {
        return (
            <View style={styles.statsContainer}>
                <StatusBar barStyle="light-content"/>
                <View>
                    <Text h4 style={styles.statsFont}>Completed</Text>
                    <Text h4 style={styles.statsFont}>Total Duration</Text>
                    <Text h4 style={styles.statsFont}>Calories burned</Text>
                </View>
                <View >
                    <Text h4 style={styles.statsFont}>{this.state.workouts.length}</Text>
                    <Text h4 style={styles.statsFont}>0</Text>
                    <Text h4 style={styles.statsFont}>0</Text>

                </View>
            </View>
        )
    }

    deleteWorkout = (workoutId) => {
        let newWorkouts;
        this.workoutService
            .deleteWorkout(this.state.userId, workoutId)
            .then(() => {
                newWorkouts = this.renderWorkoutsForUser()
            });
        this.props.navigation.navigate('Home', {workouts: newWorkouts});
    }

    renderWorkoutsForUser = () => {
        return (
            this.state.workouts.map((workout, index) => {
                return <WorkoutItem key={index}
                                    id={workout}
                                    navigation={this.props.navigation}
                                    handleDelete={()=>this.deleteWorkout(workout)}></WorkoutItem>
            })
        )
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={styles.header}>
                    <Text h4 style={styles.titleFont}>{this.state.username}'s Workouts history </Text>
                    <Button title='+'
                            buttonStyle={{backgroundColor: colors.lightcharcoal}}
                            onPress={this.handleAddWorkout}></Button>
                </View>

                {this.renderWorkoutStats()}

                <ScrollView style={styles.workoutsContent}>
                    {this.renderWorkoutsForUser()}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.logout}
                        icon={
                            <Icon
                                name='arrow-right'
                                size={15}
                                color='white'
                            />
                        }
                        buttonStyle={styles.button}
                        title='Log out'
                    />
                </View>



                {/*<BottomNavBar/>*/}
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.charcoal,
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
    statsContainer: {
        height: 100,
        backgroundColor: colors.yps,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    workoutsContent: {
        backgroundColor: colors.white,
    },
    statsFont: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Arial'
    },
    titleFont: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Arial'
    },
    button: {
        backgroundColor: colors.green

    },
    buttonContainer: {
        backgroundColor: colors.white
    }
})

export default Home