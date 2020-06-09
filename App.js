import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { purple, white } from './utils/colors';
import { NavigationContainer } from '@react-navigation/native';
import FitStatusBar from './components/FitStatusBar';
import EntryDetail from './components/EntryDetail';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNavigation from './components/Navigation/TabsNavigation';

const store = createStore(reducers);

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