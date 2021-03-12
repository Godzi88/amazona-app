import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {
    productCreateReducer, productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer
} from "./Reducers/productReducers";
import {cartReducer} from "./Reducers/cartReducers";
import {
    userDeleteReducer,
    userDetailsReducer, userListReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer
} from "./Reducers/userReducer";
import {
    orderCreateReducer, orderDeleteReducer, orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMyListReducer,
    orderPayReducer
} from "./Reducers/orderReducers";

const initialState = {

    userSignin: {
        userInfo: localStorage.getItem('userInfo')?
            JSON.parse(localStorage.getItem('userInfo')):null

    },

    cart:{
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod:"PayPal",
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    cart:cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    deleteProduct:productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList:userListReducer,
    userDelete: userDeleteReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;