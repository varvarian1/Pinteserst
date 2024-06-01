import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
	value: boolean;
}

const initialState: IAuthState = {
	value: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		isAuth: (state: IAuthState) => {
			state.value = !state.value;
		},
	},
});

export const { isAuth } = authSlice.actions;

export default authSlice.reducer;
