import React from "react";
import {View,Text,Image,StyleSheet,Button,TouchableOpacity, TouchableNativeFeedback,Platform} from "react-native"
import * as Colors from '../../constants/Colors';
const ProductItem=props=>{

    let TouchableCmp = TouchableOpacity;

    if( Platform.OS === 'android' && Platform.Version >= 21 ){
        TouchableCmp = TouchableNativeFeedback;
    }


    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
    <TouchableCmp onPress={props.onSelect} useForeground>
    <View >
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:props.image}}/>
        </View>
        <View style={styles.detail}>
        <Text style={styles.title}>
            {props.title}
        </Text>
        <Text style={styles.price}>
            ${props.price.toFixed(2)}
        </Text>
        </View>
      
        <View style={styles.actions} > 
           {props.children} 
        </View>
        </View>
    
    </TouchableCmp>
    </View>
    </View>
    
    )



}

const styles=StyleSheet.create({
    product:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0, height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
      },
    imageContainer:{
        width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    },
    detail:{
        alignItems:'center',
    height:'15%',
        padding:10,
    },
    image:{
        width:'100%',
        height:'100%'

    },
    title:{
        fontSize:18,
        marginVertical:4,

    },
    price:{
        fontSize:14,
        color:'#666',

    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        height:'25%'

    }

})

export default ProductItem;