import React, { Component } from 'react'
import {View, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import colors from 'Colors';
import cookie from "react-cookies";
import UserService from "../../services/UserService";
import SwipeoutWrapper from '../../elements/SwipeoutWrapper';

class WeightList extends Component {
    static navigationOptions = {
        title: 'Weight History',
        headerTitleStyle: {
            color: colors.white
            // fontFamily: fonts.montserrat
        },
        headerStyle: {
            backgroundColor: colors.charcoal,
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
    constructor(props) {
        super(props);

        this.state = {
        }
        this.userService = UserService.instance;
    }

    handleAddWeight = () => {
        this.userService
            .addWeightToUser(this.state.userId, this.state.newWeight)
            .then(res => {
                this.setState({weights: res.weights});
            })

    }

    deleteNote = (selectedItem) => {
        alert('delete row' + selectedItem.weight + ' date:  '+selectedItem.date);
    }

    renderWeightList = () => {
        return (
            this.state.weights.map((weight, index) => {
                return (
                    <SwipeoutWrapper item={weight}
                                     deleteNote={this.deleteNote}/>
                )
            })
        )
    }
    componentWillMount = () => {
        var userCookie = cookie.load('user');
        if(userCookie) {
            // this.setProfile(user.username, user.age, user.currentWeight);
            this.setState({
                userId: userCookie._id,
                weights: userCookie.weights
            });
        }
    }

    componentDidMount() {
        this.userService
            .findUserById(this.state.userId)
            .then(res => {
                this.setState({weights: res.weights});
            })
    }


    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({newWeight: text})}
                        value={this.state.newWeight}
                        placeholder='Enter your new weight here'></TextInput>
                    <Button title='Add weight entry'
                            backgroundColor= {colors.green}
                            onPress={this.handleAddWeight}></Button>
                </View>
                <ScrollView style={styles.mealListContent}>
                    {this.renderWeightList()}

                </ScrollView>
            </View>
        )

    }

}

export default WeightList;

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column'
        // justifyContent: 'space-between',
        // padding: 20
    },
    inputContainer: {
        padding: 10
    },
    titleFont: {
        color: colors.white,
        fontSize: 16
    },
    textInput: {
        height: 40,
        fontSize: 15
    }
})

