// eslint-disable-next-line import/named
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './slices/authSlices';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

const createNoopStorage = () => {
	return {
		setItem: (_key: string, value: string) => value,
		getItem: (_key: string) => null,
		removeItem: (_key: string) => {},
	};
};

const storage =
	typeof window !== 'undefined'
		? createWebStorage('local')
		: createNoopStorage();

const persistConfig = {
	key: 'auth',
	storage: storage,
	whitelist: ['auth'],
};

const rootReducer = combineReducers({
	auth: authReducer,
});

const makeConfiguredStore = () =>
	configureStore({
		reducer: authReducer,
	});

export const makeStore = () => {
	const isServer = typeof window === 'undefined';
	if (isServer) {
		return makeConfiguredStore();
	} else {
		const persistedReducer = persistReducer(persistConfig, rootReducer);
		let store: any = configureStore({
			reducer: persistedReducer,
		});
		store.__persistor = persistStore(store);
		return store;
	}
};

export type AppStore = ReturnType<typeof makeStore>;
