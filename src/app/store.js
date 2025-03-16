import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/themeSlice";
import authReducer from "../features/authSlice";
import notificationReducer from "../features/notificationSlice";
import shoppingReducer from "../features/shoppingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    notification: notificationReducer,
    shopping: shoppingReducer,
  },
});
