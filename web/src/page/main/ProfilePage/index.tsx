'use client';

import ProfileInfo from '@/components/model/widgets/ProfileInfo';
import ProfileStatistic from '@/components/model/widgets/ProfileStatistic';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import styles from './ProfilePage.module.scss';
import UserService from '@/services/user.service';
import ProfileSettings from '@/components/model/widgets/ProfileSettings';
import useTitleStore from '@/store/useTitleStore';
import { usePathname } from 'next/navigation';

interface IUserInfo {
	name: string;
	email: string;
	level: number;
	createdCards: number;
	createdCategories: number;
	swiped: number;
	swipedCategories: number;
	currentLevel: string;
}

const profileData = {
	name: 'guest',
	email: '',
	level: 0,
	createdCards: 0,
	createdCategories: 0,
	swiped: 0,
	swipedCategories: 0,
	currentLevel: 'null',
};

const ProfilePage = () => {
	const path = usePathname();
	const [userInfo, setUserInfo] = useState<IUserInfo>(profileData);
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const query = useQuery(['getUserInfo', { jwt }], () =>
		UserService.getUser(jwt),
	);

	const { setTitle } = useTitleStore(state => state);

	useEffect(() => {
		if (path === '/settings') {
			setTitle('Профиль / Настройки');
		}
	}, []);

	useEffect(() => {
		if (query.data !== undefined)
			setUserInfo({
				...userInfo,
				name: query.data?.username,
				...query.data,
			});
	}, [jwt, query.data]);

	return (
		<div className={styles.profile}>
			<div className={styles['profile-info']}>
				<ProfileInfo userInfo={userInfo} className={styles.user} />
				<ProfileStatistic
					userInfo={userInfo}
					className={styles['profile-stat']}
				/>
			</div>
			<ProfileSettings />
		</div>
	);
};

export default ProfilePage;
