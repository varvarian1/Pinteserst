import { createSlice } from '@reduxjs/toolkit';

interface IAuthState {
	isAuth: boolean;
	access: string;
}

const initialState: IAuthState = {
	isAuth: false,
	access: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		isAuth: (state: IAuthState, action) => {
			state.isAuth = action.payload;
		},
		setJWT: (state: IAuthState, action) => {
			state.access = action.payload;
		},
	},
});

export const { isAuth, setJWT } = authSlice.actions;

export default authSlice.reducer;
