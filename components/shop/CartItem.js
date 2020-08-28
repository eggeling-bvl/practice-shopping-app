import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const CartItem = (props) => {
    return (
    <View>
        <Text>
            <Text>{props.quantity}</Text> 
            <Text>{props.title}</Text>
        </Text>
        <View>
        <Text>${props.amount}</Text>

      { props.deletable && (<TouchableOpacity onPress={props.onRemove}>
            <Ionicons
            name={Platform.OS==='android'? 'md-trash':'ios-trash'}
            size={23}
            color="red"
            />
        </TouchableOpacity>)}
        </View>
    </View>

      );
}

const styles=StyleSheet.create({

})
 
export default CartItem;