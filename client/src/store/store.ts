import {applyMiddleware, combineReducers, createStore} from 'redux';
import userReducer from './userReducer';
import {persistReducer, persistStore} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import {thunk} from 'redux-thunk';
import productReducer from '../components/slices/productSlice';
import authReducer from '../components/slices/authSlice';

const rootReducer = combineReducers({
  userData: userReducer,
  productData: productReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
