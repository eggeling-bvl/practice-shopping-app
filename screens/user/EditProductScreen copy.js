import React,{useState, useCallback, useEffect, useReducer} from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,Platform,Alert} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import * as Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsAction from '../../store/actions/index'

const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE';

const formReducer=(state,action)=>{
if(action.type === FORM_INPUT_UPDATE){
    const updatedValue={
        ...state.inputValues,
        [action.input]:action.value
    }
    const updatedValidities={
        ...state.inputValidities,
        [action.input]:action.isValid
    }
let updateIsValid=true
for (const key in updatedValidities){
    updateIsValid=updateIsValid && updatedValidities[key]
}

    return {
        formIsValid:updateIsValid,
        inputValidities:updatedValidities,
        inputValues:updatedValue
    }

}
return state;
};


const EditProductScreen = (props) => {

        const pId= props.navigation.getParam('productId')
        const editedProduct=useSelector(state=>state.products.userProducts.find(prd=>prd.id===pId))
        const dispatch=useDispatch();

      const [formState, dispatchFormState]=  useReducer(formReducer,{
          inputValues:{
            title:editedProduct ? editedProduct.title:'',
            imageUrl:editedProduct ? editedProduct.imageUrl:'',
            description:editedProduct ? editedProduct.description:'',
            price:''
        },
        inputValidities:{
            title:editProduct ? true:false,
            imageUrl:editProduct ? true:false,
            description:editProduct ? true:false,
            price:editProduct ? true:false,

        },
        formIsValid:editProduct ? true:false})
      
      
         const submitHandlier = useCallback(()=>{
             if(!formState.formIsValid){
                 Alert.alert('Wrong input!', 'please check yoform',[
                     {text:'o.k.'}
                 ])
                 return;
             }



                            if(editedProduct){

                                dispatch(productsAction.updateProduct(pId,formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl))
                            }else {
                                dispatch(productsAction.createProduct(formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl, +formState.inputValues.price))

                            }
                            props.navigation.goBack();


                        },[dispatch, pId,formState])
                
                        useEffect(()=>{
                            props.navigation.setParams({submit:submitHandlier})
                        },[submitHandlier])
        const titleChangeHandler=(inputIdentifier,text)=>{
            let isValid=false;
            if(text.trim().length > 0){
              isValid=true

            }
         dispatchFormState({
             type:FORM_INPUT_UPDATE,
             value:text, 
        isValid:isValid,
    input:inputIdentifier})
        }

    return ( 
    
    <ScrollView>
        <View>

    <View>
        <Text>
   Title
        </Text>
        <TextInput value={formState.inputValues.title} onChangeText={titleChangeHandler.bind(this, 'title')} 
        keyboardType="default"
        autoCapitalize='sentences'
        autoCorrect
        returnKeyType='next'
        onEndEditing={()=>console.log('onEndEditing')}
        onSubmitEditing={()=>console.log('onSubmitEditing')}
        />

        {!formState.inputValidities.title && (<Text>Please enter a valid titel</Text>)}
    </View> 
    <View>
        <Text>
   Image Url
        </Text>
        <TextInput value={formState.inputValues.imageUrl} onChangeText={titleChangeHandler.bind(this, 'imageUrl')}/>
    </View> 
    {editedProduct ? null : (<View>
        <Text>
   Price
        </Text>
        <TextInput value={formState.inputValues.price} onChangeText={titleChangeHandler.bind(this, 'price')}
         keyboardType="decimal-pad"/>
    </View> )}
    <View>
        <Text>
   Discription
        </Text>
        <TextInput value={formState.inputValues.description} onChangeText={titleChangeHandler.bind(this, 'description')}/>
    </View> 
        </View>

    </ScrollView>
    );}



    EditProductScreen.navigationOptions=navData=>{

        const submitHad=navData.navigation.getParam('submit')
        const HeaderRightButton=()=>{
            return(
               <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                title='MEnu' 
                iconName={Platform.OS==='android' ? "md-checkmark":'ios-checkmark'}
                onPress={
                    submitHad
    
                }/></HeaderButtons>
            )
        }
        return {
            headerTitle:navData.navigation.getParam('productId')? 'Edit Product': 'Add Product',
            headerRight:HeaderRightButton
        }
    }
const styles=StyleSheet.create({

})
 
export default EditProductScreen;