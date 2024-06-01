import MainText from '../../ui/MainText';
import styles from './ProfileInfo.module.scss';
import { IUserInfo } from './profile-info.interface';
import MainTitle from '../../ui/MainTitle';
import cn from 'clsx';
import MainButton from '../../ui/MainButton';
import useAuthStore from '@/store/useAuthStore';
import { User } from 'lucide-react';

const ProfileInfo = ({
	userInfo,
	className,
}: {
	userInfo: IUserInfo;
	className?: string;
}) => {
	const setJwt = useAuthStore(state => state.setJwt);

	return (
		<div className={cn(styles.info, className)}>
			<div className={styles['main_info']}>
				<User
					width={80}
					height={80}
					stroke="var(--color-icons)"
					className={styles['info-avatar']}
				/>
				<div>
					<MainTitle size="small" className={styles.name}>
						{userInfo.name}
					</MainTitle>
					<MainText
						size="middle"
						type="regular"
						className={styles['email-container']}>
						Почта:
						<MainText size="middle" className={styles.email}>
							{userInfo.email}
						</MainText>
					</MainText>
					<MainText
						size="middle"
						type="regular"
						className={styles['rank-container']}>
						Звание:
						<MainText size="middle" className={styles.rank}>
							{userInfo.swiped === 0 || userInfo.swiped <= 500
								? 'Новичок'
								: userInfo.swiped < 500 && userInfo.swiped <= 1500
									? 'Любознательный исследователь'
									: userInfo.swiped < 1500 && userInfo.swiped <= 3000
										? 'Активный коммуникатор'
										: userInfo.swiped < 3000 && userInfo.swiped <= 5000
											? 'Уверенный лингвист'
											: userInfo.swiped < 5000 && userInfo.swiped <= 10000
												? 'Языковой магистр'
												: userInfo.swiped > 10000 &&
													'Мастер языкового искусства'}
						</MainText>
					</MainText>
				</div>
			</div>
			<MainButton
				onClick={() => setJwt('')}
				color="red"
				size="middle"
				className={styles['exit-button']}>
				Выйти
			</MainButton>
		</div>
	);
};

export default ProfileInfo;
