'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from '@/components/ui/Loader';

export default function StoreProvider({ children }: { children: ReactNode }) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return (
		<Provider store={storeRef.current}>
			<PersistGate
				loading={<Loader />}
				persistor={storeRef.current.__persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
