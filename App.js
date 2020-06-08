import React from 'react';
import { View, Text, Platform } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { purple, white, red } from './utils/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, FontAwesome } from 'react-native-vector-icons';

const store = createStore(reducers);

const Tab = createMaterialTopTabNavigator()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex:1}}>
          <View style={{height: 20}}>
            
          </View>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Hello" component={History} />
              <Tab.Screen name="Bye" component={AddEntry} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}