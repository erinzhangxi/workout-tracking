import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Card, ListItem, Button, Icon } from 'react-native-elements'
import colors from 'Colors';
import cookie from "react-cookies";
import WorkoutService from "../../services/WorkoutService";

class WorkoutDetail extends Component {
    static navigationOptions = {
        title: 'Workout Details'
    }

    constructor(props) {
        super(props);

        this.state = {
        }
        this.workoutService = WorkoutService.instance;
    }

    componentWillMount() {
        var user = cookie.load('user');
        if(user) {
            this.setState({userId: user._id});
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const workoutId = navigation.getParam("workoutId")
        // fetch from server
        this.workoutService
            .findWorkoutById(workoutId)
            .then(res => {
                this.setState({
                    workoutId: workoutId,
                    time: res.time,
                    duration: res.duration,
                    title: res.title,
                    description: res.description,
                    location: res.location,
                    caloriesBurned: res.caloriesBurned
                });
            })
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <View>

                <Card
                    title={this.state.title}
                    image={require('../../assets/images/running.jpg')}>
                    <Text style={{marginBottom: 10}}>
                        {this.state.description}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        {this.state.location}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        {this.state.time}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        {this.state.duration}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                        {this.state.caloriesBurned}
                    </Text>
                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        backgroundColor='red'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Delete'
                        onPress={params.handleDelete()}/>
                </Card>

            </View>
        )
    }

}

export default WorkoutDetail;

