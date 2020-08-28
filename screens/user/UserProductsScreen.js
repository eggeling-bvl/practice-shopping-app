import React from 'react';
import {FlatList,Button,Alert} from 'react-native'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import * as Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import {useSelector, useDispatch} from 'react-redux'

import * as productsActions from '../../store/actions/index'

const UserProductsScreen = (props) => {

const userProducts=useSelector(state=>state.products.userProducts)
const dispatch=useDispatch();

const editProductsHandler=(id)=>{
    props.navigation.navigate('EditProducts',{productId:id})
}
const deleteProductHandler=(id)=>{
    dispatch(productsActions.deleteProduct(id));
}

    return (<FlatList  data={userProducts} keyExtractor={item=>item.id} 
        renderItem={itemData=>(
        <ProductItem
        image={itemData.item.imageUrl}
        title={itemData.item.title}
        price={itemData.item.price}
        onSelect={()=>{
            editProductsHandler(itemData.item.id)
        }}
        >
<Button color={Colors.red} title ="Edit" onPress={()=>{
    editProductsHandler(itemData.item.id)
    }}/>
<Button color={Colors.red} title ="Delete" onPress={()=>{
      Alert.alert(
        "Alert Title",
        "Are You sure? Do You want to delete?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => deleteProductHandler(itemData.item.id) }
        ],
        { cancelable: false }
      );





    
}}/>
        </ProductItem>)} />  );
}
 
UserProductsScreen.navigationOptions=navData=>{
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
    const HeaderRightButton=()=>{
        return(
           <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='MEnu' 
            iconName={Platform.OS==='android' ? "md-create":'ios-create'}
            onPress={()=>{
                navData.navigation.navigate('EditProducts');

            }}/></HeaderButtons>
        )
    }

    return {
        headerTitle:'Your Product',
        headerLeft:HeaderLeftButton,
        headerRight:HeaderRightButton
    }
}

export default UserProductsScreen;