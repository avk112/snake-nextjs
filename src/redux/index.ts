import { configureStore } from "@reduxjs/toolkit";
import scoreReducer from "./scoreSlice";
import speedReducer from "./speedSlice";
import gameStatusReducer from "./gameStatusSlice";
import pressedKeyReducer from "./pressedKeySlice";

const store = configureStore({
  reducer: {
    score: scoreReducer,
    speed: speedReducer,
    gameStatus: gameStatusReducer,
    pressedKey: pressedKeyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
