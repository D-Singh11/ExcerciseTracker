import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { purple, white } from './utils/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';
import FitStatusBar from './components/FitStatusBar';
import EntryDetail from './components/EntryDetail';
import { createStackNavigator } from '@react-navigation/stack';
import Live from './components/Live';

const store = createStore(reducers);

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


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FitStatusBar backgroundColor={purple} barStyle='light-content' />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}