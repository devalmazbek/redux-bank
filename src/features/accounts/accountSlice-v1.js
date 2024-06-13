const initialStoreAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

const host = 'api.frankfurter.app';

export default function reducerAccount(state = initialStoreAccount, action) {
	switch(action.type) {
		case "account/deposit": 
			return { ...state, balance: state.balance + action.payload, isLoading: false };
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

		case "account/loading":
			return { ...state, isLoading: true }

		default: 
			return state;
	}
}


export function deposit(amount, currency) {
	if(currency === 'USD') {
		return { type: "account/deposit", payload: amount }
	}

	return async function(dispatch, getState) {
		dispatch({ type: "account/loading" })
		
		const request = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`);
		const data = await request.json();
		const converted = data.rates.USD;

		dispatch({ type: "account/deposit", payload: converted })
	}
	
}

export function widthdraw(amount) {
	return { type: "account/widthdraw", payload: amount }
}

export function requestLoan(amount, purpose) {
	return { type: "account/requestLoan", payload: { amount, purpose } }
}

export function payLoan() {
	return  { type: "account/payLoan" }
}