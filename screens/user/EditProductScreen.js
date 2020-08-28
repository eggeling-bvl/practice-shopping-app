import React,{useState, useCallback, useEffect, useReducer} from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,Platform,Alert} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import * as Colors from '../../constants/Colors'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productsAction from '../../store/actions/index'
import Input from '../../components/UI/Input'

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
            title: editedProduct ? true:false,
            imageUrl:editedProduct ? true:false,
            description:editedProduct ? true:false,
            price:editedProduct ? true:false,

        },
        formIsValid: editedProduct ? true : false
        
    })
      
      
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
        const inputChangeHandler=useCallback((inputIdentifier, inputValue, inputValidity)=>{
           
         dispatchFormState({
             type:FORM_INPUT_UPDATE,
             value:inputValue, 
        isValid:inputValidity,
    input:inputIdentifier})
        },[dispatchFormState])

    return ( 
    
    <ScrollView>
        <View>

            <Input
            id="title"
            label="Title"
            errorText="Please enter a valid titel"
    
             keyboardType="default"
             autoCapitalize='sentences'
             autoCorrect
             returnKeyType='next'
             onInputChange={inputChangeHandler}
             initialValue={editedProduct ? editedProduct.title : ''}
             initiallyValid={!!editedProduct}
             required
            />

<Input
 id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid Image Url"
    
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
            />
               {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
            <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
    
            
            />


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