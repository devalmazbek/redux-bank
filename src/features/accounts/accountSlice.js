import { createSlice } from "@reduxjs/toolkit";

const initialState= {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
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
		}
	}
});

export const { deposit, widthdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;






