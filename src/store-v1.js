import { combineReducers, createStore } from 'redux';

const initialStoreAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

const ininitialStoreCustomer = {
	fullname: '',
	nationalID: '',
	createdAt: '',
}

function reducerAccount(state = initialStoreAccount, action) {
	switch(action.type) {
		case "account/deposit": 
			return { ...state, balance: state.balance + action.payload };
		case "account/widthdraw": 
			return { ...state, balance: state.balance - action.payload };
		case "account/requestLoan": 
			if(state.loan > 0) return state;
			return { 
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount 
			};
		case "account/payLoan": 
			return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan };

		default: 
			return state;
	}
}

function reducerCustomer(state = ininitialStoreCustomer, action) {
	switch(action.type) {
		case "customer/createCustomer": 
			return {...state, 
				fullname: action.payload.fullname,
				nationalID: action.payload.nationalID,
				createdAt: action.payload.createdAt,
			};

		case "customer/updateName": 
			return { ...state, fullname: action.payload };

		default: 
			return state
	}
}

const rootReducer = combineReducers({
	account: reducerAccount,
	customer: reducerCustomer,
});

export const store = createStore(rootReducer);

// store.dispatch( { type: "account/deposit", payload: 200 } );
// store.dispatch( { type: "account/widthdraw", payload: 150 } );

// store.dispatch( { type: "account/requestLoan", payload: { amount: 1000, purpose: 'buy a car' } } );
// store.dispatch( { type: "account/payLoan", payload: 1000 } );


function deposit(amount) {
	return { type: "account/deposit", payload: amount }
}

function widthdraw(amount) {
	return { type: "account/widthdraw", payload: amount }
}

function requestLoan(amount, purpose) {
	return { type: "account/requestLoan", payload: { amount, purpose } }
}

function payLoan(amount) {
	return  { type: "account/payLoan", payload: amount }
}

store.dispatch(deposit(200));
store.dispatch(widthdraw(150));
store.dispatch(requestLoan(1000, 'buy a car'));
store.dispatch(payLoan(1000));

function createCustomer(fullname, nationalID) {
	return {
		type: "customer/createCustomer",
		payload: { fullname, nationalID, createdAt: new Date().toISOString() },
	}
}

console.log(store.getState());


store.dispatch(createCustomer('piter parker', '1231131'));

console.log(store.getState());


