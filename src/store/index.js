import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

// rootReducer 설정
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

// persist 설정
const persistConfig = {
  key: "root",
  storage,
};

// persistedReducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store 생성
export const store = configureStore({
  reducer: persistedReducer, // persistedReducer를 바로 할당
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor 생성
export const persistor = persistStore(store);