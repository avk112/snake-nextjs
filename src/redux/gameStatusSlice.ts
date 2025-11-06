import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameStatusState {
  started: boolean;
  finished: boolean;
  isWin: boolean;
  paused: boolean;
}

const initialState: GameStatusState = {
  started: false,
  finished: false,
  isWin: false,
  paused: false,
};

const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState,
  reducers: {
    startGame: (state) => {
      state.started = true;
      state.paused = false;
    },
    finishGame: {
      reducer(state, action: PayloadAction<{ isWin: boolean }>) {
        state.finished = true;
        state.isWin = action.payload.isWin;
      },
      prepare(win: boolean = false) {
        return {
          payload: {
            isWin: win,
          },
        };
      },
    },
    pauseGame: (state) => {
      state.paused = true;
    },

    startOrPause: (state) => {
      if (!state.finished && (state.paused || !state.started)) {
        state.started = true;
        state.paused = false;
      } else if (!state.finished && state.started && !state.paused) {
        state.paused = true;
      }
    },

    refreshGame: () => {
      return initialState;
    },
  },
});

export const { startGame, finishGame, pauseGame, startOrPause, refreshGame } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;
