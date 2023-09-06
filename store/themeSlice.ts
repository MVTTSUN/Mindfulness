import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "light",
  idRadioButton: 2,
};

export const themeSlice = createSlice({
  name: "theme",
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
