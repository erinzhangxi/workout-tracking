import React, { Component } from 'react'
import { View, ScrollView, ImageBackground, StyleSheet } from 'react-native'
import { Text, Button, Card, Icon } from 'react-native-elements'
import cookie from "react-cookies";
import FoodService from "../../services/FoodService";
import Animation from 'lottie-react-native';
import stars from '../../assets/animations/5_stars.json';
import BackButton from '../../elements/BackButton.js'
import mealBG from '../../assets/images/DetailsBG.png';
import colors from 'Colors';

class MealDetails extends Component {
    static navigationOptions = {
        title: 'Meal Details'
    }

    constructor(props) {
        super(props);

        this.state = {
        }
        this.foodService = FoodService.instance;
    }

    componentWillMount() {
        var user = cookie.load('user');
        if(user) {
            this.setState({userId: user._id});
        }
    }

    componentDidMount() {
        this.animation.play();
        const {navigation} = this.props;
        const mealId = navigation.getParam("mealId")
        // fetch from server
        this.foodService
            .findMealById(mealId)
            .then(res => {
                this.setState({
                    mealId: mealId,
                    date: res.date,
                    type: res.type,
                    foods: res.foods
                });
            })
    }

    renderFoodList = () => {
        // let foodlist = null;
        // foodlist = this.state.foods.map(function (food) {
        //     return <ListItem key={index}
        //                      title={food.name}
        //                      subtitle={food.calories}></ListItem>
        //
        // })
        //
        // return foodlist;
    }

    render() {
        const { params } = this.props.navigation.state;
        return (
            <ImageBackground source={mealBG} style={styles.backgroundImage}>
                <ScrollView>
                    <BackButton page='FoodLog'/>
                    <Card
                        title={this.state.type}
                        image={require('../../assets/images/meal-placeholder.jpg')}
                        containerStyle={styles.cardStyle}>

                        <Text style={styles.titleFont}>
                            Food List
                        </Text>
                        <Text style={styles.textFont}>
                            /* Foods detail goes here */
                            {this.renderFoodList()}
                        </Text>

                        <Text style={styles.titleFont}>
                           Date
                        </Text>
                        <Text style={styles.textFont}>
                            {this.state.date}
                        </Text>

                        {/*<Text style={{marginBottom: 10}}>*/}
                        {/*Length:  {this.state.foods.length}*/}
                        {/*</Text>*/}
                        
                        <View style={styles.animationContainer}>
                            <Animation
                                ref={animation => {
                                    this.animation = animation;
                                }}
                                style={styles.animation}
                                loop={true}
                                source={stars}
                            />
                        </View>

                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='red'
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='Delete'
                            onPress={params.handleDelete}/>
                    </Card>
                </ScrollView>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1
    },
    animationContainer: {
        width: 150,
        height: 80
    },
    animation: {
        width: 150,
        height: 80
    },
    cardStyle: {
        borderRadius: 10
    },
    titleFont: {
        color: colors.lightishgray,
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: 'bold'
    },
    textFont: {
        marginBottom: 10,
        color: colors.lightgray,
        fontSize: 13,
        fontFamily: 'Arial',
    }

});


export default MealDetails;

