import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import { Platform } from 'react-native';
import AddEntry from '../AddEntry';
import History from '../History';
import Live from '../Live';
import { purple, white } from '../../utils/colors';


const TabsNavigation = () => {
    return (
        //* Spread all the properties of TabNavigatorConfig to pass them as props */ }
        <Tab.Navigator {...TabNavigatorConfig}>

            {/* Other way to specify all props using inline syntax */}
            <Tab.Screen name="History" component={History} />

            {/* one way to specify route configs using spread operator. RouteConfigs is defined as object vsriable */}
            < Tab.Screen {...RouteConfigs['AddEntry']} />

            < Tab.Screen name="Live" component={Live} />

        </Tab.Navigator>

    )
}

export default TabsNavigation;

const RouteConfigs = {
    History: {
        name: "History",
        component: History,
        options: { tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'History' }
    },
    AddEntry: {
        component: AddEntry,
        name: "Add Entry",
        options: { tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Entry' }
    }
}

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : purple,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};

const Tab = Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()
