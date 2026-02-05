import { configureStore } from "@reduxjs/toolkit";
import candidateFormReducer from "./candidateFormSlice";

export const store = configureStore({
  reducer: {
    candidateForm: candidateFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
