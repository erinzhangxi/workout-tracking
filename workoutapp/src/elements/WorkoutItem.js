import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import WorkoutService from "../services/WorkoutService";

// given a workout id, fetch workout from server and render the workout item
class WorkoutItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: '',
            duration: '',
            title: '',
            description: '',
            location: '',
            caloriesBurned: 0
        }
        this.workoutService = WorkoutService.instance;
    }

    componentWillMount() {
        this.workoutService
            .findWorkoutById(this.props.id)
            .then(res => {
                this.setState({
                    time: res.time,
                    duration: res.duration,
                    title: res.title,
                    description: res.description,
                    location: res.location,
                    caloriesBurned: res.caloriesBurned
                })
            })
    }
    render() {
        return (
            <ListItem title={this.state.title} subtitle={this.state.description}/>
        )
    }
}

export default WorkoutItem;

// {/*<ListItem*/}
//                 {/*title={workout.title}*/}
//                 {/*subtitle={workout.duration}*/}
//                 {/*key={index}/>*/}