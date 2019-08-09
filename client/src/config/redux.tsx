import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authReducer from "../redux/reducers/authReducer";

const authPersistConfig = {
  key: "auth",
  storage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer)
});

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { persistor, store };
