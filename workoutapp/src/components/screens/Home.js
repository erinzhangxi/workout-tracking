import React, { Component } from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import workoutService from '../../services/WorkoutService'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';
// import fonts from 'Fonts';


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
            userId: null
        }
        this.workoutService = workoutService.instance;
    }

    componentDidMount() {
      this.renderWorkouts(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.renderWorkouts(newProps);
    }

    renderWorkouts = (props) => {
        var userId = props.userId;
        this.workoutService
            .findAllWorkouts()
            .then((workouts) => {this.setWorkouts(workouts)});
    }

    handleAddWorkout = () => {
        this.props.navigation.navigate("WorkoutEditor");
    }
    setWorkouts = (workouts) => {
        this.setState({
            workouts: workouts
        });
    }
    logout = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={styles.header}>
                    <Text h4 style={styles.titleFont}>Workouts history </Text>
                    <Button title='+'
                           buttonStyle={{backgroundColor: colors.lightcharcoal}}
                            onPress={this.handleAddWorkout}></Button>
                </View>
                <View style={styles.statsContainer}>

                    <Text h4 style={styles.statsFont}>Completed</Text>
                    <Text h4 style={styles.statsFont}>Total Duration</Text>
                    <Text h4 style={styles.statsFont}>Calories burned</Text>

                </View>
                <ScrollView style={styles.workoutsContent}>

                    {this.state.workouts.map((workout, index) => (
                        <ListItem
                            title={workout.title}
                            subtitle={workout.duration}
                            key={index}/>
                    ))}
                </ScrollView>
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
        borderColor:'red'
    },
    workoutsContent: {
        backgroundColor: colors.white,
        borderColor:'red'
    },
    statsFont: {
        color: 'white',
        fontSize: 18

    },
    titleFont: {
        color: colors.white,
        fontSize: 16
    },
    button: {
        backgroundColor: colors.green

    }
})

export default Home