import { applyMiddleware, combineReducers, createStore } from 'redux';
import reducerAccount from './features/accounts/accountSlice';
import reducerCustomer from './features/customers/customerSlice';
import { thunk } from 'redux-thunk';



const rootReducer = combineReducers({
	account: reducerAccount,
	customer: reducerCustomer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));




