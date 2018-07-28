import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Animation from 'lottie-react-native';
import add_animation from '../assets/animations/fab_animate.json';
import { withNavigation } from 'react-navigation';

class AddButton extends Component {
    componentDidMount = () => {
        this.animation.play();

    }

    render() {
        return (
            <View style={styles.animationContainer}>
                <TouchableOpacity
                    onPress={this.props.addAction}
                >
                    <Animation
                        ref={animation => {
                            this.animation = animation;
                        }}
                        style={styles.add}
                        loop={true}
                        source={add_animation}
                    />

                </TouchableOpacity>
            </View>)
    }
}

export default withNavigation(AddButton);

const styles = StyleSheet.create({
    animationContainer:{
        width: 80,
        height: 80
    },
    add: {
        width: 80,
        height: 80
    }
})
