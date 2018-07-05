import React, { Component } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements'
import BottomNavigation, { IconTab , Badge }  from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class BottomNavBar extends Component {
    state = {
        activeTab: 'games'
    }

    tabs = [
        {
            key: 'workouts',
            icon: 'gamepad-variant',
            label: 'workouts',
            barColor:'#c9ebff'
        },
        {
            key: 'food',
            icon: 'movie',
            label: 'food',
            barColor:'#c9ebff'
        },
        {
            key: 'progress',
            icon: 'gamepad-variant',
            label: 'progress',
            barColor:'#c9ebff'
        },
        {
            key: 'profile',
            icon: 'gamepad-variant',
            label: 'profile',
            barColor:'#c9ebff'
        }
    ]

    state = {
        activeTab: this.tabs[0].key
    }

    renderIcon = icon => ({ isActive }) => (
        <Icon size={24} color="white" name={icon} />
    )

    renderTab = ({ tab, isActive }) => (
        <IconTab
            isActive={isActive}
            showBadge={tab.key === 'movies-tv'}
            renderBadge={() => <Badge>2</Badge>}
            key={tab.key}
            label={tab.label}
            renderIcon={this.renderIcon(tab.icon)}
        />
    )

    render() {
        return (
            <View style={{ flex: 1,  backgroundColor: 'white'  }}>
                <View style={{ flex: 1}}>
                    {/* Your screen contents depending on current tab. */}
                    <Text>Bottom Nav</Text>
                    <BottomNavigation
                        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                        renderTab={this.renderTab}
                        tabs={this.tabs}
                        activeTab={this.state.activeTab}
                    />
                </View>

            </View>
        )
    }
}

export default BottomNavBar
