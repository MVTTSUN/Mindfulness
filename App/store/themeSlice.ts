import { createSlice } from "@reduxjs/toolkit";
import { SliceName, Theme } from '../const';

const initialState = {
  value: Theme.Light,
  idRadioButton: 2,
};

export const themeSlice = createSlice({
  name: SliceName.Theme,
  initialState,
  reducers: {
    changeTheme(state, action) {
      state.value = action.payload;
    },
    setIdRadioButton(state, action) {
      state.idRadioButton = action.payload;
    },
  },
});

export const { changeTheme, setIdRadioButton } = themeSlice.actions;

export default themeSlice.reducer;
