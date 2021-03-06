import React, { Component } from 'react'
import {View, ImageBackground, ScrollView, Image, StyleSheet, TouchableOpacity, PixelRatio} from 'react-native';
import { Text, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import PROFILE_PICTURE from '../../assets/images/profile-placeholder.png'
import cookie from "react-cookies";
import colors from 'Colors';
import UserService from "../../services/UserService";
import ImagePicker from 'react-native-image-picker'
import Animation from 'lottie-react-native';
import setting from '../../assets/animations/49-Settings.json';
import notification from '../../assets/animations/Notification_Red.json';
import profileBG from '../../assets/images/profileBG.png';


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
            weight: '',
            avatarSource: null,
            videoSource: null
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
        this.animation.play();
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
    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }


    render() {
        return (
            <ImageBackground source={profileBG} style={styles.backgroundImage}>
                <ScrollView>
                    <View style={[styles.boxContainer]}>
                        <View style={styles.avatarContainer}>

                            <TouchableOpacity onPress={this.selectPhotoTapped}>
                                <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                                    { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                                        <Image style={styles.avatar} source={this.state.avatarSource} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userContainer}>

                            {/*<View style={styles.animationContainer}>*/}
                            {/*<Animation*/}
                            {/*ref={animation => {*/}
                            {/*this.animation = animation;*/}
                            {/*}}*/}
                            {/*style={styles.animation}*/}
                            {/*loop={true}*/}
                            {/*source={setting}*/}
                            {/*/>*/}
                            {/*</View>*/}
                            <Icon
                                name='settings-outline'
                                size={20}
                                color={'white'}
                                onPress={()=> this.props.navigation.navigate('EditProfile')}/>}


                            <Text h4 style={styles.userFontTitle}>username</Text>  <Text h4 style={styles.userFont}>{this.state.username}</Text>
                            <Text h4 style={styles.userFontTitle}>Age</Text> <Text h4 style={styles.userFont}> {this.state.age}</Text>
                            <Text h4 style={styles.userFontTitle}>Current Weight</Text> <Text h4 style={styles.userFont}> {this.state.currentWeight}</Text>
                        </View>
                    </View>

                    <View style={styles.messageContainer}>
                        <View style={styles.titleWithNotification}>
                            <Text style={styles.titleFont}>Messages from friends</Text>
                            <View style={styles.notificationContainer}>
                                <Animation
                                    ref={animation => {
                                        this.animation = animation;
                                    }}
                                    style={styles.notification}
                                    loop={true}
                                    source={notification}
                                />
                            </View>
                        </View>

                        {this.renderFeeds()}
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

export const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        // resizeMode: 'stretch', // or 'cover'
    },
    boxContainer: {
        flex: 2,
        flexDirection: 'row',
        height: 260
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
    messageContainer: {
        flex: 7,
        backgroundColor: colors.white
    },
    userFontTitle: {
        marginTop: 5,
        color: colors.lightishgray,
        fontSize: 17,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    userFont: {
        color: colors.lightgray,
        fontSize: 17,
        fontFamily: 'Arial'
    },
    titleFont: {
        fontSize: 18,
        color: colors.darkblue,
        fontFamily: 'Arial',
        marginLeft: 20

    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    },
    animationContainer: {
        width: 200,
        height: 200
    },
    animation: {
        width: 200,
        height: 200
    },
    titleWithNotification:{
        flexDirection: 'row'
    },
    notificationContainer: {
        width: 50,
        height: 50
    },
    notification: {
        width: 150,
        height: 150
    }
})

export default Profile