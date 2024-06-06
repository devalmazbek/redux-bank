import { createStore } from 'redux';

const initialStore = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

function reducer(state = initialStore, action) {
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

export const store = createStore(reducer);

// store.dispatch( { type: "account/deposit", payload: 200 } );
// store.dispatch( { type: "account/widthdraw", payload: 150 } );

// store.dispatch( { type: "account/requestLoan", payload: { amount: 1000, purpose: 'buy a car' } } );
// store.dispatch( { type: "account/payLoan", payload: 1000 } );

console.log(store.getState());

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

console.log(store.getState());


