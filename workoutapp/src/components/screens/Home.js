import React, { Component } from 'react'
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import BottomNavBar from '../../elements/BottomNavBar'

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
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
                <ScrollView>
                    <Text h4>Workouts history </Text>

                    {this.state.workouts.map((workout, index) => (
                        <ListItem
                            title={workout.title}
                            subtitle={workout.duration}
                            key={index}/>
                    ))}


                </ScrollView>
                <BottomNavBar/>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

export default Home