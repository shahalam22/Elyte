const { createSlice } = require("@reduxjs/toolkit");

const data = [];

const initialState = { 
    wishlist: data,
    cart: data,
 };

 /**
  * product: {
  *     id: 1,
  *     quantity: 1,
  * }
 */

 const userSlice = createSlice({
    name: 'values',
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
        },
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        addToWishlist: (state, action) => {
            const productW = state.wishlist.find((product) => product.id === action.payload.id);

            if(!productW){
                state.wishlist.push(JSON.parse(JSON.stringify(action.payload)))
            }
        },
        addToCart: (state, action) => {
            const productC = state.cart.find((product) => product.id === action.payload.id);

            if(productC){
                state.cart.map((product) => {
                    if(product.id === action.payload.id){
                        product.attributes.quantity += 1;
                    }
                })
            }else{
                state.cart.push(JSON.parse(JSON.stringify(action.payload)));
            }
        },
        removeFromWishlist: (state, action) => {
           state.wishlist.map((product) => {
                if(product.id === action.payload.id){
                    state.wishlist = state.wishlist.filter((product) => product.id !== action.payload.id);
                }
           })
        },
        removeFromCart: (state, action) => {
            state.cart.map((product) => {
                 if(product.id === action.payload.id && product.attributes.quantity > 1){
                      product.attributes.quantity -= 1;
                 }else if(product.id === action.payload.id && product.attributes.quantity === 1){
                     state.cart = state.cart.filter((product) => product.id !== action.payload.id);
                 }
            })
        }
    },
 });



export const { setWishlist, setCart, addToWishlist, addToCart, removeFromWishlist, removeFromCart } = userSlice.actions;
export default userSlice.reducer;