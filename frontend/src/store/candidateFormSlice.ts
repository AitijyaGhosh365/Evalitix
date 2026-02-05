import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CandidateFormState = {
  data: any;
};

const initialState: CandidateFormState = {
  data: {},
};

const candidateFormSlice = createSlice({
  name: "candidateForm",
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    resetFormData(state) {
      state.data = {};
    },
  },
});

export const { setFormData, resetFormData } = candidateFormSlice.actions;
export default candidateFormSlice.reducer;
