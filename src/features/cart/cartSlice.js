import { createSlice } from "@reduxjs/toolkit";

/* 
    Object's format in "cart" array
    {
        itemName: "abc",
        img: "url",
        unitPrice: 100,
        quantity: 2,
        totalPrice: 200
    }
*/ export const initialState = {
    cart: [],
    isCartOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            // payload = { itemName, img, unitPrice, quantity, totalPrice }
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            // payload = itemName
            state.cart = state.cart.filter(
                (item) => item.itemName !== action.payload
            );
        },
        increaseItemQuantity(state, action) {
            // payload = itemName
            const item = state.cart.find(
                (item) => item.itemName === action.payload
            );

            item.quantity += 1;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            // payload = itemName
            const item = state.cart.find(
                (item) => item.itemName === action.payload
            );

            item.quantity -= 1;
            item.totalPrice = item.quantity * item.unitPrice;

            if (item.quantity === 0) {
                cartSlice.caseReducers.deleteItem(state, action);
            }
        },
        clearCart(state) {
            state.cart = [];
        },
        openCart(state) {
            // payload = boolean
            state.isCartOpen = true;
        },
        closeCart(state) {
            // payload = boolean
            state.isCartOpen = false;
        },
    },
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    openCart,
    closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selector functions

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
    state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getItemQuantity = (name) => (state) => {
    return (
        state.cart.cart.find((item) => item.itemName === name)?.quantity ?? 0
    );
};

export const getIsCartOpen = (state) => state.cart.isCartOpen;
