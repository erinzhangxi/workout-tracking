import React, { Component } from 'react'
import { Login,
    Register,
    Home,
    FoodLog,
    Progress,
    Profile,
    FoodLogEditor,
    WorkoutEditor,
    EditProfile,
    WeightList,
    AuthLoadingScreen,
    WorkoutDetail,
    MealDetails,
    TrophyScreen
} from './components/screens'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import {createStore} from "redux";
import {foodLogReducer} from "./reducers/foodLogReducer";
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeStacks = createStackNavigator({
    Home: Home,
    WorkoutEditor: WorkoutEditor,
    WorkoutDetail: WorkoutDetail,
    TrophyScreen: TrophyScreen
}, { headerMode: 'none' });


const FoodLogsStacks = createStackNavigator({
    FoodLog: FoodLog,
    FoodLogEditor: FoodLogEditor,
    MealDetails:  MealDetails
}, { headerMode: 'none' });

const ProgressStacks = createStackNavigator({
    Progress: Progress,
    WeightList: WeightList
}, { headerMode: 'none' });

const ProfileStacks = createStackNavigator({
    Profile: Profile,
    EditProfile: EditProfile
},{ headerMode: 'none' });

export const MainApp = createBottomTabNavigator({
        Home: { screen:  HomeStacks},
        FoodLog: { screen: FoodLogsStacks },
        Progress: { screen: ProgressStacks },
        Profile: { screen: ProfileStacks }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'FoodLog') {
                    iconName = `ios-paper${focused ? '' : '-outline'}`;
                } else if (routeName === 'Progress') {
                    iconName = `ios-trending-up${focused ? '' : '-outline'}`;
                } else if (routeName === 'Profile') {
                    iconName = `ios-person${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

export const AuthStack = createStackNavigator({
    Login: { screen: Login },
    Register: { screen: Register }
},{ headerMode: 'none' });

export const Stack = createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        App: MainApp
    },
    {
        initialRouteName: 'AuthLoading'
    });

let store = createStore(foodLogReducer);


class App extends Component {

    componentDidMount() {
    }


    render() {
        return (
            <Provider store={store}>
                <Stack />
            </Provider>
        );
    }
}


export default App;