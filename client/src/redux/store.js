import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice.js";
const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducers,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  //now our actions can include function or Promises
});

export const persistor = persistStore(store);

//how to user redux-persist
// 1. combine the reducers using combineReducers
// 2. make persistReducer with some configuration like {key , storage(import it from redux-persist),}(neccesary ones), others are blacklist, whitelist to blacklist or whitelist the things(they only work in one level), so if needed for multilayer, then you can use nested persist
// 3. now replace the reducers in reducer with persistReducer
// 4. Make persistor with persistStore
// 5. export it and make it accessible using persistgate in the index.js
