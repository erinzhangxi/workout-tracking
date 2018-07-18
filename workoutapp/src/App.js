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
    AuthLoadingScreen
} from './components/screens'
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import { Provider } from 'react-redux';
import {createStore} from "redux";
import {foodLogReducer} from "./reducers/foodLogReducer";

const HomeStacks = createStackNavigator({
    Home: Home,
    WorkoutEditor: WorkoutEditor
});


const FoodLogsStacks = createStackNavigator({
    FoodLog: FoodLog,
    FoodLogEditor: FoodLogEditor
});

const ProgressStacks = createStackNavigator({
    Progress: Progress,
    WeightList: WeightList
});

const ProfileStacks = createStackNavigator({
    Profile: Profile,
    EditProfile: EditProfile
});

export const MainApp = createBottomTabNavigator({
    Home: { screen:  HomeStacks},
    FoodLog: { screen: FoodLogsStacks },
    Progress: { screen: ProgressStacks },
    Profile: { screen: ProfileStacks }
});

// export const Stack =  createStackNavigator({
//     Login: { screen: Login },
//     Home: { screen: MainApp },
//     Register: { screen: Register }
// });

export const AuthStack = createStackNavigator({
    Login: { screen: Login },
    Register: { screen: Register }
});

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
    render() {
        return (
            <Provider store={store}>
                    <Stack />
            </Provider>
        );
    }
}


export default App;