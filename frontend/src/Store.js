import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':

            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            const cartItems = existingItem ? state.cart.cartItems.map((item) => item._id === existingItem._id ? newItem : item) : [...state.cart.cartItems, newItem]
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }


        case 'CART_REMOVE_ITEM':
            {
                const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id)
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                return { ...state, cart: { ...state.cart, cartItems } }
            }

        default:
            return state
    }
}

// ===================================Wish list part ===========================================

const initialState2 = {
    wishlist: {
        wishlistItems: localStorage.getItem("wishlistItems") ? JSON.parse(localStorage.getItem("wishlistItems")) : []
    }
}

function reducer2(state, action) {
    switch (action.type) {
        case 'WISHLIST_ADD_ITEM':

            const newItem = action.payload;
            const existingItem = state.wishlist.wishlistItems.find((item) => item._id === newItem._id);
            const wishlistItems = existingItem ? state.wishlist.wishlistItems.map((item) => item._id === existingItem._id ? newItem : item) : [...state.wishlist.wishlistItems, newItem]
            localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems))
            return { ...state, wishlist: { ...state.wishlist, wishlistItems } }


        case 'WISHLIST_REMOVE_ITEM':
            {
                const wishlistItems = state.wishlist.wishlistItems.filter((item) => item._id !== action.payload._id)
                localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems))
                return { ...state, wishlist: { ...state.wishlist, wishlistItems } }
            }

        default:
            return state
    }
}


// =================================Wish list part=============================================

function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [state2, dispatch2] = useReducer(reducer2, initialState2);


    const value = { state, dispatch, state2, dispatch2 };

    return <Store.Provider value={value}> {props.children} </Store.Provider>;
}

export { Store, StoreProvider }





















// import { createContext, useReducer } from "react";

// export const Store = createContext()

// const initialState = {
//     cart: {
//         cartItems: []
//     }
// }

// function reducer(state, action) {
//     switch (action.type) {
//         case 'CART_ADD_ITEM':
//             return {
//                 ...state,
//                 cart: {
//                     ...state.cart,
//                     cartItems: [...state.cart.cartItems, action.payload]
//                 }
//             }
//             default :
//             return state
//     }
// }

// export function StoreProvider(props) {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     const value = { state, dispatch }

//     return <Store.Provider value={value}>{props.chindren}</Store.Provider>

// }
