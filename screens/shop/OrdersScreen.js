import React from 'react';
import {Platform, FlatList,Text} from 'react-native'
import {useSelector} from 'react-redux'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {

const orders=useSelector(state=>state.orders.orders)

    return (
    <FlatList data={orders} keyExtractor={item=>item.id} 
    renderItem={itemData=>(
    <OrderItem
    amount={itemData.item.totalAmount}
    date={itemData.item.readableData}
    items={itemData.item.items}
    />)}/> );
}
 OrdersScreen.navigationOptions=navData=>{
    const HeaderLeftButton=()=>{
        return(
           <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='MEnu' 
            iconName={Platform.OS==='android' ? "md-menu":'ios-menu'}
            onPress={()=>{
                navData.navigation.toggleDrawer();
            }}/></HeaderButtons>
        )
    }

    return { 
        headerTitle:'Your Cart',
        headerLeft:HeaderLeftButton
}

 }
export default OrdersScreen;