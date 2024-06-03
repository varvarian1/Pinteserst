'use client';

import { usePathname } from 'next/navigation';
import MainTitle from '../../ui/MainTitle';
import styles from './Settings.module.scss';
import cn from 'clsx';

const ProfileSettings = () => {
	const path = usePathname();
	return (
		<div
			className={cn(styles.settings, path === '/settings' && styles.animate)}>
			<MainTitle size="large">Скоро...</MainTitle>
		</div>
	);
};

export default ProfileSettings;
