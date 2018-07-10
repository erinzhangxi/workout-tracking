import React, { Component } from 'react'
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import BottomNavBar from '../../elements/BottomNavBar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from 'Colors';

class Progress extends Component {
    static navigationOptions = {
        title: 'Progress',
        headerTitleStyle: {
            color: colors.white
        },
        headerStyle: {
            backgroundColor: colors.charcoal
        },
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon size={24} color="#611dce" name='chart-line' />;
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
    }

    componentDidMount() {
    }


    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={[styles.boxContainer, styles.statsContainer ]}>

                    <Text h4 style={styles.statsFont}>Last Weight</Text>
                    <Text h4 style={styles.statsFont}>Current Weight</Text>
                    <Text h4 style={styles.statsFont}>Weight Changed</Text>

                </View>
                <View style={[styles.boxContainer, styles.MealContainerStyleTwo]}>

                    <Text h4 style={{color:'white'}}>Progress Chart </Text>
                </View>
                <View style={[styles.boxContainer, styles.MealContainerStyleOne]}>

                    <Text h4 style={{color:'#565656'}}>From Goal </Text>
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
        backgroundColor: colors.charcoal
        // justifyContent: 'space-between',
        // padding: 20
    },
    boxContainer: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    statsContainer: {
        flex: 2,
        backgroundColor: colors.yps,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    /*header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightcharcoal
    },*/
    MealContainerStyleTwo: {
        flex: 5,
        backgroundColor: colors.ypsLight
    },
    MealContainerStyleOne: {
        flex: 2,
        backgroundColor: colors.ypsDark
    },
    statsFont: {
        color: '#565656',
        fontSize: 17
    }
})



export default Progress