import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    timestamp: "",
    key: ""
};

const pressedKeySlice = createSlice({
    name: "pressedKey",
    initialState,
    reducers: {
        changeKey: {
            reducer(state, action){
                state.timestamp = Date.now();
                state.key = action.payload.key;
            }
        }
    }
});

export const {changeKey} = pressedKeySlice.actions;
export default pressedKeySlice.reducer;