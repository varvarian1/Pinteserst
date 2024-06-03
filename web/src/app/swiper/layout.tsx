'use client';
import Loader from '@/components/model/ui/Loader';
import useAuthStore from '@/store/useAuthStore';
import { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/auth.service';

const Layout = ({ children }: { children: ReactNode }) => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { data, isLoading, error } = useQuery(['isAuth', jwt], () =>
		AuthService.getIsAuth(jwt),
	);
	const router = useRouter();
	if (isLoading) return <Loader />;
	if (error === null && data === true) return children;
	if (data === false) {
		router.push('/login');
		return null;
	}
	return <Loader />;
};

export default Layout;
