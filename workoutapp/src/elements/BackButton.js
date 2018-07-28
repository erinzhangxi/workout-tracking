import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Animation from 'lottie-react-native';
import backArrow from '../assets/animations/hamburgerToBackArrow.json';
import { withNavigation } from 'react-navigation';

class BackButton extends Component {
    componentDidMount = () => {
        this.animation.play();

    }

    goBack = () => {
        this.props.navigation.navigate(this.props.page);
    }

    render() {
        return (
            <View style={styles.animationContainer}>
                <TouchableOpacity
                    onPress={ () => this.goBack() }
                >
                    <Animation
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={styles.animation}
                        loop={true}
                        source={backArrow}
                    />
                </TouchableOpacity>
            </View>)
    }
}

export default withNavigation(BackButton);

const styles = StyleSheet.create({
    animationContainer:{
        width: 100,
        height: 100
    },
    animation: {
        width: 100,
        height: 100
    }
})
