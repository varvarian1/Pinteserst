'use client';

import { Provider } from 'react-redux';
import store from '@/store/store';

export default function StoreProvider({ children }: ILayout) {
	return <Provider store={store}>{children}</Provider>;
}
