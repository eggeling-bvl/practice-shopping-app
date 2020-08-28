import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, AppRegistry } from 'react-native';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import ShopNavigator from './navigation/ShopNavigator'
import {AppLoading} from 'expo';

import {composeWithDevTools} from 'redux-devtools-extension'

import productsReducer from './store/reducers/index'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/order'

const rootReducer= combineReducers({
  products:productsReducer,
  cart:cartReducer,
  orders:ordersReducer
})

const store=createStore(rootReducer,composeWithDevTools())
// const store=createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

