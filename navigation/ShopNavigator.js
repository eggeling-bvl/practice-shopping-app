import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import {Platform} from 'react-native'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Ionicons  } from '@expo/vector-icons'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreens'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductsScreen from '../screens/user/EditProductScreen'
import * as Colors from '../constants/Colors'

const defaultNavOptions={
    headerStyle:{
        backgroundColor:Platform.OS==='android'? Colors.blue:''
    },
    headerTintColor:Platform.OS==='android'? Colors.white: Colors.blue
}
const ProductsNavigator=createStackNavigator({
        ProductsOverview:ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart:CartScreen
},{
    navigationOptions:{
        drawerIcon:drwerConfig=>(
            <Ionicons
            name={Platform.OS==='android'? 'md-cart':'ios-cart'}
            size={23}
            color={drwerConfig.tintColor}
        
            />
        )
            },
    defaultNavigationOptions:defaultNavOptions
})

const Ordersnavigator = createStackNavigator({
    Orders:OrdersScreen
},{

    navigationOptions:{
drawerIcon:drwerConfig=>(
    <Ionicons
    name={Platform.OS==='android'? 'md-list':'ios-list'}
    size={23}
    color={drwerConfig.tintColor}

    />
)
    },
    defaultNavigationOptions:defaultNavOptions
})


const AdminNavigator = createStackNavigator({
    UserProducts:UserProductsScreen,
    EditProducts:EditProductsScreen
},{

    navigationOptions:{
drawerIcon:drwerConfig=>(
    <Ionicons
    name={Platform.OS==='android'? 'md-create':'ios-create'}
    size={23}
    color={drwerConfig.tintColor}

    />
)
    },
    defaultNavigationOptions:defaultNavOptions
})

const ShopNavigator=createDrawerNavigator({
    Products:ProductsNavigator,
    Orders:Ordersnavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:Colors.darkGray
    }
})

export default createAppContainer(ShopNavigator)