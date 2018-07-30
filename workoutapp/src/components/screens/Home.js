import React, { Component } from 'react'
import {View,StatusBar, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, ButtonGroup, Card } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import WorkoutItem from './../../elements/WorkoutItem'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
import cookie from "react-cookies";
import Animation from 'lottie-react-native';
import task from '../../assets/animations/task_done.json';
import search from '../../assets/animations/12search.json';
import AddButton from '../../elements/AddButton'
import homeBG from '../../assets/images/home.png';

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
            caloriesBurned: 0,
            selectedIndex: 1
        }
        this.workoutService = workoutService.instance;
    }

    updateIndex = (selectedIndex) => {
        this.setState({selectedIndex})
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
        const buttons = ['Monthly View', 'Daily View']
        const { selectedIndex } = this.state

        return (
            <ImageBackground source={homeBG} style={styles.backgroundImage}>
                <StatusBar
                    barStyle="light-content"
                />
                <ScrollView>
                <View style={styles.header}>
                    <Text h4 style={styles.titleFont}>Dashboard </Text>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={styles.tabStyle}
                        containerBorderRadius={0}
                        textStyle={{color: colors.white}}
                    />
                    <Text h3 style={{color: colors.white, marginTop: 20}}>{this.state.workouts.length}</Text>
                    <Text h5 style={{color: colors.white}}>COMPLETED</Text>
                </View>


                    {/*<Card containerStyle={styles.cardStyle}>*/}
                        {/*{this.renderWorkoutStats()}*/}
                    {/*</Card>*/}

                    <View style={styles.workoutsContent}>
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
                    </View>
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
                </ScrollView>
            </ImageBackground>
        )
    }
}

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // resizeMode: 'stretch', // or 'cover'
    },
    header: {
        height: 200,
        alignItems: 'center',
        marginTop: 40
    },
    cardStyle: {
        backgroundColor: colors.darkGreen,
        marginTop: 100,
        justifyContent: null,
        alignItems: null,
    },
    tabStyle: {
        height: 30,
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        height: 100
    },
    workoutsContent: {
        backgroundColor: colors.white,
    },
    titleFont: {
        color: colors.white,
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    statsFont: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: colors.green,
        marginTop: 10,
        marginBottom: 20

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