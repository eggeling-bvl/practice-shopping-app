import PRODUCTS from '../../data/dummy-data'
import {DELETE_PRODUCT, UPDATE_PRODUCT,CREATE_PRODUCT} from '../actions/index'
import Product from '../../models/products'

const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod=>prod.ownerId='u1')
}

export default (state=initialState,action)=>{
    switch(action.type){
        case CREATE_PRODUCT:
            const newProduct = new Product(
               new Date().toString(),
               'u1',
               action.productData.title,
               action.productData.description,
               action.productData.imageUrl,
               action.productData.price

            );
            return{
                ...state,
                availableProducts:state.availableProducts.concat(newProduct),
                userProducts:state.userProducts.concat(newProduct)
            }

        case UPDATE_PRODUCT:

        const productIndex=state.userProducts.findIndex(prod=>prod.id===action.pid)
            const updateProduct=new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.description,
                action.productData.imageUrl,
                state.userProducts[productIndex].price
            )
            const updatedUserProducts=[...state.userProducts]
            updatedUserProducts[productIndex]=updateProduct

            const availableProductsIndex=state.availableProducts.findIndex(prod => prod.id === action.pid)
            const updatedAvailableProduct=[...state.availableProducts]
            updatedAvailableProduct[availableProductsIndex]=updateProduct

            return{
                ...state,
                availableProducts:updatedAvailableProduct,
                userProducts:updatedUserProducts
            }









        case DELETE_PRODUCT:
          
            return{
                ...state,
                availableProducts:state.availableProducts.filter(prod=>prod.id !== action.pid) ,
                userProducts:state.userProducts.filter(prod=>prod.id !== action.pid)
            }
    }
    return state;
}