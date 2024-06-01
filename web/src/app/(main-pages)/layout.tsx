'use client';

import { ReactNode, useEffect, useState } from 'react';
import MainWindow from '@/components/model/ui/MainWindow';
import Sidebar from '@/components/model/widgets/Sidebar';
import { usePathname, useRouter } from 'next/navigation';
import TITLES from '@/app/(main-pages)/layout.data';
import useAuthStore from '@/store/useAuthStore';
import { useQuery } from 'react-query';
import Loader from '@/components/model/ui/Loader';
import useTitleStore from '@/store/useTitleStore';
import AuthService from '@/services/auth.service';

const Layout = ({ children }: { children: ReactNode }) => {
	const [titleName, setTitleName] = useState('');
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const path = usePathname();
	const { title } = useTitleStore(({ title }) => ({ title }));
	const { data, isLoading, error } = useQuery(['isAuth', jwt], () =>
		AuthService.getIsAuth(jwt),
	);
	const router = useRouter();

	useEffect(() => {
		for (let i = 0; i < TITLES.length; i++) {
			if (TITLES[i].name === path) {
				setTitleName(TITLES[i].nameRus);
				return;
			}
			if (path) {
				switch (decodeURIComponent(path.split('/')[1])) {
					case 'categories': {
						setTitleName(title);
						break;
					}
					default: {
						setTitleName(title);
						break;
					}
				}
				if (
					decodeURIComponent(path.split('/')[1]) === 'categories' &&
					decodeURIComponent(path.split('/')[2]) === 'edit-category'
				)
					setTitleName('Редактирование категории');
			}
		}
	}, [path, title, jwt]);

	if (isLoading) return <Loader />;

	if (error === null && data === true)
		return (
			<div className="flex bg-white">
				<Sidebar />
				<MainWindow title={titleName}>{children}</MainWindow>
			</div>
		);

	if (data === false) {
		router.push('/login');
		return null;
	}

	return <Loader />;
};

export default Layout;
