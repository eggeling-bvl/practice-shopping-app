import React from "react";
import {View,Text,Image,StyleSheet,Button,ScrollView} from "react-native"
import * as Colors from '../../constants/Colors';
import {useSelector,useDispatch} from 'react-redux'
import * as cartActions from '../../store/actions/cart';



const ProductDetailScreen = props=>{

    const productId=props.navigation.getParam('productId')
    const selectedProduct=useSelector(state=> state.products.availableProducts.find(prod=>prod.id===productId))
    const dispatch=useDispatch();

    return (
        <ScrollView>
           <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
           <View style={styles.actions}>
           <Button color={Colors.maroon} title="Add to Cart" onPress={()=>{
               dispatch(cartActions.addToCart(selectedProduct));
           }}/>
           </View>
         
    <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
    <Text stype={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )

}

ProductDetailScreen.navigationOptions=navData=>{
    return {
        headerTitle:navData.navigation.getParam('productTitle'),
    };
}

const styles=StyleSheet.create({
    image:{
            width:'100%',
            height:300
    },
    price:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginHorizontal:20

    },
    description:{
fontSize:14,
textAlign:'center',
marginHorizontal:20,
marginVertical: 20,
paddingVertical:20

    },
    actions:{
        alignItems:'center',
        marginVertical: 20

    }

})

export default ProductDetailScreen;