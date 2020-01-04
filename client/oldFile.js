import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import signUp from './src/screens/signUp';
import signIn from './src/screens/signIn';
import frontPage from './src/screens/frontPage';
import camera from './src/screens/camera';
import userHome from './src/screens/userHome';
import search from './src/screens/search';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import store from './store';

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    signUp,
    signIn
  }),

  mainFlow: createBottomTabNavigator({
    frontPage,
    camera,
    userHome,
    search
  })
});

const AppContainer = createAppContainer(switchNavigator);


export default class App extends Component {
  render () {
    return (
        <Provider store={store}>
          <AppContainer/>
        </Provider>
    )
  }
}