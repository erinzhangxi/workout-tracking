import React, { Component } from 'react'
import { View, ScrollView } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'

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
            <ScrollView>
                <Text h4>Workouts history </Text>
                <View style={{padding: 15}}>
                    {this.state.workouts.map((workout, index) => (
                        <ListItem
                            title={workout.title}
                            subtitle={workout.duration}
                            key={index}/>
                    ))}
                </View>

            </ScrollView>
        )
    }
}

export default Home