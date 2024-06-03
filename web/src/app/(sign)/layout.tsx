'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import Loader from '@/components/model/ui/Loader';
import { useQuery } from 'react-query';
import { ILayout } from './layout.interface';
import styles from './layout.module.scss';
import AuthService from '@/services/auth.service';
import { useTheme } from 'next-themes';

interface IRoutes {
	[key: string]: boolean;
}

const LayoutSign = ({ children }: ILayout) => {
	const pathName = usePathname();
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { data, error, refetch } = useQuery(
		['isAuthSign', { jwt }],
		() => AuthService.getIsAuth(jwt),
		{
			refetchOnMount: false,
			enabled: false,
		},
	);
	const email = useAuthStore(state => state.email);
	const router = useRouter();

	const { theme, setTheme } = useTheme();

	useEffect(() => {
		refetch();
	}, [jwt]);

	const permisions: IRoutes = {
		'/login': true,
		'/registration': true,
		'/getmail': true,
		'/activate': jwt !== '',
		'/resetcode': email !== '',
		'/changepassword': email !== '',
	};

	const layout = (
		<div className={styles.container}>
			<div className={styles.box}>
				<Image
					src={theme !== 'light' ? '/img/logo-white.svg' : '/img/logo1.svg'}
					alt="Logo"
					width={212}
					height={60}
					className={styles.logo}
					onClick={() => router.replace('/')}
				/>
				<div className={styles.center}>{children}</div>
			</div>
		</div>
	);

	if ((error !== null || data === false) && pathName && permisions[pathName]) {
		return layout;
	}

	if (
		error === null &&
		data === true &&
		pathName === '/activate' &&
		email === ''
	) {
		return layout;
	}
	if (error === null && data === true) {
		router.push('/home');
	} else {
		return <Loader />;
	}

	return 'Error';
};

export default LayoutSign;
