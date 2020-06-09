import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './TabsNavigation';
import EntryDetail from '../EntryDetail';
import { purple, white } from '../../utils/colors';


const StackNavigatorRouteConfig = {
    Home: {
        name: 'Home',
        component: TabsNavigation,
        options: { headerShown: false }
    },
    EntryDetail: {
        name: 'EntryDetail',
        component: EntryDetail,
        options: {
            // title: 'Entry Detail',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }

    }
}

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator headerMode={'screen'}>
            <Stack.Screen {...StackNavigatorRouteConfig['Home']} />
            <Stack.Screen {...StackNavigatorRouteConfig['EntryDetail']} />
        </Stack.Navigator>
    )
}

export default MainNavigator;