import React from 'react';
import {FlatList,Platform,Button} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons'

import * as cartActions from '../../store/actions/cart'
import * as Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem'

const ProductsOverviewScreen =props=>{
        const products=useSelector(state=>state.products.availableProducts)
        const dispatch=useDispatch();


        const selectItemHandler=(id,title)=>{
            props.navigation.navigate('ProductDetail',{
                productId:id,
                productTitle:title,
            });
        };

return (
<FlatList data={products} keyExtractor={item=>item.id} 
renderItem={itemData=>(
<ProductItem 
image={itemData.item.imageUrl}
title={itemData.item.title}
price={itemData.item.price}
onSelect={()=>{selectItemHandler(itemData.item.id,itemData.item.title)}}
>
<Button color={Colors.red} title ="View Detail" onPress={()=>{selectItemHandler(itemData.item.id,itemData.item.title)}}/>
<Button color={Colors.red} title ="To Cart" onPress={()=>{
    dispatch(cartActions.addToCart(itemData.item));
}}/>
</ProductItem>
)}
/>);
}


ProductsOverviewScreen.navigationOptions=(navData)=>{
    const HeaderRightButton=()=>{
        return(
           <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='Cart' 
            iconName={Platform.OS==='android' ? "md-cart":'ios-cart'}
            onPress={()=>{
                // navData.navigation.toggleDrawer();
    navData.navigation.navigate('Cart')
            }}/></HeaderButtons>
        )
    }
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
        headerTitle:'All Products',
        headerRight:HeaderRightButton,
        headerLeft:HeaderLeftButton
    }
    
}

export default ProductsOverviewScreen;