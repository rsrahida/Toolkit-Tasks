import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearNotification: (state) => {
      state.type = "";
      state.message = "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
