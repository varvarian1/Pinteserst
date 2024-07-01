declare module 'redux-persist/lib/storage' {
	import { Storage } from 'redux-persist';
	const storage: Storage;
	export default storage;
}

declare module 'redux-persist' {
	import { Reducer } from 'redux';

	export interface PersistConfig {
		key: string;
		storage: Storage;
		whitelist?: string[];
		blacklist?: string[];
	}

	export function persistReducer<S, A>(
		config: PersistConfig,
		reducer: Reducer<S, A>,
	): Reducer<S, A>;

	export function persistStore(
		store: any,
		options?: any,
		callback?: () => any,
	): any;
}
