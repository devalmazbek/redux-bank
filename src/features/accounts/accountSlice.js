const initialStoreAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

export default function reducerAccount(state = initialStoreAccount, action) {
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


export function deposit(amount) {
	return { type: "account/deposit", payload: amount }
}

export function widthdraw(amount) {
	return { type: "account/widthdraw", payload: amount }
}

export function requestLoan(amount, purpose) {
	return { type: "account/requestLoan", payload: { amount, purpose } }
}

export function payLoan(amount) {
	return  { type: "account/payLoan", payload: amount }
}