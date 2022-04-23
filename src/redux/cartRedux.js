import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        products: [],
        // quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action)=>{
            // state.quantity += 1;
                // state.products.push(action.payload);
                state.total += action.payload.price * action.payload.quantity;
                 if(state.products.some(c=> c.productId===action.payload.productId)){
                 const updated = state.products.find(p=> p.productId === action.payload.productId)
                 if(updated){
                     updated.quantity = action.payload.quantity
                 }
                //  state.products = [...state.products, updated]
                 }else{
                //  console.log(state.product.filter(c=> c.productId===action.payload.productId)
                  state.products.push(action.payload)
                }
            // return
        },
        initialiseProducts: (state, action)=>{
            state.products = action.payload
            state.products.forEach(c=> {
                state.total += c.price * c.quantity;
            })
        },
        removeCartItem: (state, action)=>{
            state.products = state.products.filter(x=> x.productId !== action.payload)
        },
        resetCart: (state)=>{
            state.products = []
            state.total = 0


        }
    },
})

// function includeProduct

export const {addProduct, initialiseProducts, removeCartItem, resetCart} = cartSlice.actions
export default cartSlice.reducer