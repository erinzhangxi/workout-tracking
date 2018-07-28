import React, { Component } from 'react'
import {View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import WorkoutItem from './../../elements/WorkoutItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import cookie from "react-cookies";
import Animation from 'lottie-react-native';
import task from '../../assets/animations/task_done.json';
import search from '../../assets/animations/12search.json';
import AddButton from '../../elements/AddButton'

class Home extends Component {
    static navigationOptions = {
        title: 'Home',
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
        this.animation.play();
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
        this.props.navigation.navigate('WorkoutEditor');
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
                <View style={{marginLeft: 10}}>
                    <Text h4 style={styles.statsFont}>{this.state.workouts.length}</Text>
                    <Text h4 style={styles.statsFont}>0</Text>
                    <Text h4 style={styles.statsFont}>0</Text>

                </View>
                <View style={styles.animationContainer}>
                    <Animation
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={styles.animation}
                        loop={true}
                        source={task}
                    />
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

                </View>

                {this.renderWorkoutStats()}

                <ScrollView style={styles.workoutsContent}>
                    <View style={styles.searchContainer}>
                        <Animation
                            ref={animation => {
                                this.animation = animation;
                            }}
                            style={styles.search}
                            loop={true}
                            source={search}
                        />
                    </View>
                    {this.renderWorkoutsForUser()}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <AddButton addAction={this.handleAddWorkout}/>

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
        backgroundColor: colors.yps,
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
    statsContainer: {
        height: 100,
        backgroundColor: colors.yps,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:20
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
        backgroundColor: colors.green,
        marginTop: 10

    },
    buttonContainer: {
        backgroundColor: colors.white
    },
    animationContainer: {
        width: 200,
        height: 300,
        marginRight: 0
    },
    animation: {
        width: 200,
        height: 300
    },
    searchContainer: {
        width: 300,
        height: 50
    },
    search: {
        width: 300,
        height: 120
    },
    addContainer: {
        width: 80,
        height: 80
    },
    add: {
        width: 80,
        height: 80
    }
})

export default Home