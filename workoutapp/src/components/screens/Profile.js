import React, { Component } from 'react'
import {View, Image, StyleSheet} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PROFILE_PICTURE from '../../assets/images/profile-placeholder.png'
import cookie from "react-cookies";
import colors from 'Colors';
import UserService from "../../services/UserService";

const list = [
    {
        name: 'Amy Wonderland',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'motivation sent from Amy!'
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Chris congratulated on your last workout!'
    }
]

// TODO fetch user data again
class Profile extends Component {
    static navigationOptions = {
        title: 'Profile',
        headerTitleStyle: {
            color: colors.white
        },
        headerStyle: {
            backgroundColor: colors.charcoal
        },
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon size={24} color="#611dce" name='account' />;
        },
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            age: '',
            weight: ''
        }
        this.userService = UserService.instance;
    }

    componentWillMount() {
        var user = cookie.load('user');
        if(user) {
            this.setProfile(user.username, user.age, user.currentWeight, user._id);
        }
    }

    componentDidMount() {
        this.userService
            .findUserById(this.state.userId)
            .then(res => {
                this.setProfile(res.username, res.age, res.currentWeight, this.state.userId);
                cookie.save('user', res);
            })
    }


    setProfile = (username, age, currentWeight, userId) => {
        this.setState({
            username: username,
            age: age,
            currentWeight: currentWeight,
            userId: userId
        })
    }
    renderFeeds = () => {
        return (
            list.map((item, index) => {
                    return (<ListItem
                            key={index}
                            leftAvatar={{source: {uri: item.avatar_url}}}
                            title={item.name}
                            subtitle={item.subtitle}/>
                    )
                }
            ))
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={[styles.boxContainer]}>
                    <View style={styles.avatarContainer}>
                        <Image source={PROFILE_PICTURE}
                               style={{
                                   width: 40,
                                   height: 40}}/>
                    </View>
                    <View style={styles.userContainer}>

                        <Icon
                            name='settings-outline'
                            size={20}
                            color={'white'}
                            onPress={()=> this.props.navigation.navigate('EditProfile')}/>}


                        <Text h4 style={styles.userFont}>username {this.state.username}</Text>
                        <Text h4 style={styles.userFont}>Age {this.state.age}</Text>
                        <Text h4 style={styles.userFont}>Current Weight {this.state.currentWeight}</Text>
                    </View>
                </View>
                <View style={styles.boxThree}>
                    <Text style={styles.titleFont}>Messages from friends</Text>
                    {this.renderFeeds()}
                </View>
            </View>
        )
    }
}

export const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.black
    },
    boxContainer: {
        flex: 3,
        backgroundColor: colors.ypsLight,
        flexDirection: 'row'
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    userContainer: {
        flex: 2,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 30


    },
    avatarContainer: {
        flex: 1,
        // alignItems: 'flex-start',
        justifyContent:'center',
        marginLeft: 30


    },
    boxThree: {
        flex: 7,
        backgroundColor: colors.white
    },
    userFont: {
        color: '#565656',
        fontSize: 17
    },
    titleFont: {
        fontSize: 18,
        color: colors.darkblue,
        fontFamily: 'Avenir',
        marginLeft: 20

    }
})

export default Profile