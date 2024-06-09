import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showPwaPrompt: false,
    showPaymentSuccess: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        openPwaPrompt(state) {
            state.showPwaPrompt = true;
        },
        closePwaPrompt(state) {
            state.showPwaPrompt = false;
        },
        openPaymentSuccess(state) {
            state.showPaymentSuccess = true;
        },
        closePaymentSuccess(state) {
            state.showPaymentSuccess = false;
        },
    },
});

export const {
    openPwaPrompt,
    closePwaPrompt,
    openPaymentSuccess,
    closePaymentSuccess,
} = appSlice.actions;

export default appSlice.reducer;

export const getShowPwaPrompt = (state) => state.app.showPwaPrompt;
export const getShowPaymentSuccess = (state) => state.app.showPaymentSuccess;
