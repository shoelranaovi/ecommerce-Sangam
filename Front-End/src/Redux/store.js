import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthSlice from "./AuthSlice";
import postSlice from "./postSlice";
import cartSlice from "./AddtoCart";
import AddressSlice from "./AddressSlice";

const rootReducer = combineReducers({
  auth: AuthSlice,
  post: postSlice,
  cart: cartSlice,
  shopAddress: AddressSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
