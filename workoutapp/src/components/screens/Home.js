import React, { Component } from 'react'
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import BottomNavBar from '../../elements/BottomNavBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


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
            workouts: []
        }
        this.workoutService = workoutService.instance;
    }

    componentDidMount() {
        this.workoutService
            .findAllWorkouts()
            .then((workouts) => {this.setWorkouts(workouts)});
    }

    handleSubmit() {
        alert("register");
    }
    setWorkouts = (workouts) => {
        this.setState({
            workouts: workouts
        });
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={[styles.boxContainer, styles.header]}>
                    <Text h4 style={{color: 'white'}}>Workouts history </Text>
                </View>
                <View style={[styles.boxContainer, styles.statsContainer ]}>

                    <Text h4 style={styles.statsFont}>Completed</Text>
                    <Text h4 style={styles.statsFont}>Total Duration</Text>
                    <Text h4 style={styles.statsFont}>Calories burned</Text>

                </View>
                <View style={[styles.boxContainer, styles.workoutsContent]}>

                    {this.state.workouts.map((workout, index) => (
                        <ListItem
                            title={workout.title}
                            subtitle={workout.duration}
                            key={index}/>
                    ))}
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
        backgroundColor: '#CE6D39'
    },
    statsContainer: {
        flex: 2,
        backgroundColor: '#F17F42',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    workoutsContent: {
        flex: 7,
        backgroundColor: '#FFEEE4'
    },
    statsFont: {
        color: 'white',
        fontSize: 17
    }
})

export default Home