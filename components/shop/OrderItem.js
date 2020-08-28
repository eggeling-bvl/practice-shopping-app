import React,{useState} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native'
import CartItem from '../../components/shop/CartItem';
import * as Colors from '../../constants/Colors'

const OrderItem = (props) => {


    const [showDetails, setShowDetails] =useState(false)
    return ( <View>
        <View>
    <Text>${props.amount.toFixed(2)}</Text>
    <Text>{props.date}</Text>
        </View>
        <Button 
        title={ !showDetails ? "show details":"hide details"} onPress={()=>{
            setShowDetails( prevState => !prevState )
            console.log(props.items)
        }}/>
        {showDetails && (<View>
            {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              title={cartItem.productTitle}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
            />
          ))}
            
            
            </View>)}
    </View>
         );
}
 
const styles=StyleSheet.create({

})
export default OrderItem;