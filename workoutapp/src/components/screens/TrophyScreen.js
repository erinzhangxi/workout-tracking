import React, { Component } from 'react'
import {View, ScrollView, StyleSheet} from 'react-native';
import { Text,Button } from 'react-native-elements'
import colors from 'Colors';
import Animation from 'lottie-react-native';
import trophy from '../../assets/animations/trophy.json';

class TrophyScreen extends Component {
    static navigationOptions = {
        headerTitleStyle: {
            color: colors.white
            // fontFamily: fonts.montserrat
        },
        headerStyle: {
            backgroundColor: colors.charcoal,
        }
    }
    componentDidMount() {
        this.animation.play();
    }

    goBack = () => {
        this.props.navigation.navigate('Home', {userId: this.props.userId});
    }

    render () {
        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.fontStyle}>Congratulations, you have completed a workout!</Text>
                    <Text style={styles.paragraphStyle}>Your parents will be proud of you!</Text>
                </View>
                <View style={styles.animationContainer}>
                    <Animation
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={styles.animation}
                        loop={true}
                        source={trophy}
                    />
                    <Button title='Back'
                            onPress={this.goBack}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}/>
                </View>
            </ScrollView>
        )
    }

}

export const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.darkGreen
    },
    textContainer: {
        justifyContent:'space-around',
        backgroundColor: colors.darkGreen,
        marginTop: 40
    },
    animationContainer: {
        width: 300,
        height: 200,
        backgroundColor: colors.darkGreen
    },
    animation: {
        width: 300,
        height: 200
    },
    fontStyle: {
        fontSize: 30,
        fontFamily: 'Arial',
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    paragraphStyle: {
        fontSize: 18,
        fontFamily: 'Arial',
        color: colors.white,
        marginLeft: 20
    },
    button: {
        backgroundColor: colors.darkGreen
    },
    buttonText: {
        color: colors.white,
        fontFamily: 'Arial'
    }
})

export default TrophyScreen;
