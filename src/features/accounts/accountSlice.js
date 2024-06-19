import { createSlice } from "@reduxjs/toolkit";

const initialState= {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

const host = 'api.frankfurter.app';

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
			state.isLoading = false;
		},

		widthdraw(state, action) {
			state.balance -= action.payload;
		},

		requestLoan: {
			prepare(amount, purpose) {
				return {
					payload: { amount, purpose }
				};
			},

			reducer(state, action) {
				if(state.loan > 0) return;

				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.purpose;
				state.balance += action.payload.amount;
			}
		},

		payLoan( state ){
			state.balance -= state.loan;
			state.loan = 0;
			state.purpose = "";
		},
		
		loading( state ) {
			state.isLoading = true;
		}
	}
});

export const { widthdraw, requestLoan, payLoan } = accountSlice.actions;

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

export default accountSlice.reducer;