import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.score += action.payload.number;
    },
    refresh: () => {
      return initialState;
    },
  },
});

export const { increment, refresh } = scoreSlice.actions;
export default scoreSlice.reducer;
