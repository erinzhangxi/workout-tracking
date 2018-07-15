import React, { Component } from 'react'
import { ScrollView, Picker, StyleSheet } from 'react-native'
import { Text, Button, FormLabel, FormInput, ListItem } from 'react-native-elements'
import colors from 'Colors';
import {connect} from "react-redux";
import * as actions from "../../actions"
import cookie from "react-cookies";

class MealDetails extends Component {
    static navigationOptions = {
        title: 'Meal Details'
    }

}

export default MealDetails;

