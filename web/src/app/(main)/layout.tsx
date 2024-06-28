'use client';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LayoutMain = ({ children }: ILayout) => {
	const router = useRouter();
	const auth = useSelector((state: any) => state.auth.isAuth);

	useEffect(() => {
		if (!auth) {
			router.push('/login');
		}
	});

	if (auth) {
		return <>{children}</>;
	}
};

export default LayoutMain;
