import MainTitle from '@/components/model/ui/MainTitle';
import MainText from '@/components/model/ui/MainText';
import CircleBar from '@/components/model/widgets/CircleBar';
import styles from './ProfileStatistic.module.scss';
import { IUserInfo } from './profile-statistic.interface';
import cn from 'clsx';
import { useEffect, useState } from 'react';
import UserService from '@/services/user.service';
import { useQuery } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import useSwipedCategories from '@/store/useSwipedCategories';

const levels = [
	{ maxLevel: 10, levelName: 'A1', words: 500 },
	{ maxLevel: 25, levelName: 'A2', words: 1000 },
	{ maxLevel: 50, levelName: 'B1', words: 2000 },
	{ maxLevel: 150, levelName: 'B2', words: 3250 },
	{ maxLevel: 250, levelName: 'C1', words: 5000 },
	{ maxLevel: 1000, levelName: 'C2', words: 15000 },
	{ maxLevel: Infinity, levelName: 'C2', words: 15000 },
];

const ProfileStatistic = ({
	userInfo,
	className,
}: {
	userInfo: IUserInfo;
	className?: string;
}) => {
	const { swipedCategories } = useSwipedCategories(state => state);
	const userLevel = Math.floor(userInfo.level);
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { data } = useQuery(['getDictCards', { jwt }], () =>
		UserService.getDictCards(jwt),
	);
	const userLevelWithoutInteger = userInfo.level - Math.floor(userInfo.level);
	const userLevelPercent = Number(userLevelWithoutInteger.toFixed(2)) * 100;
	const expLeft = Math.round((1 - userLevelWithoutInteger) * 1000);

	const [knowWords, setKnowWords] = useState(0);

	useEffect(() => {
		const userInfoLevel = levels.find(
			level => userInfo.level <= level.maxLevel,
		);

		if (userInfoLevel) {
			userInfo.currentLevel = userInfoLevel.levelName;
			setKnowWords(userInfoLevel.words);
		}
	}, [userInfo.level, setKnowWords, userInfo]);

	return (
		<div className={cn(styles.statistic, className)}>
			<MainTitle size="middle" className={styles['statistic-title']}>
				Статистика
			</MainTitle>
			<div className={styles['statistic-holder']}>
				<div className={styles.level}>
					<MainTitle className={styles['level-title']}>Уровень</MainTitle>
					<div className={styles['level-info']}>
						<div className={styles['level-cycle']}>
							<CircleBar level={userLevel} progress={userLevelPercent} />
						</div>
						<div>
							<MainText size="large" className={styles['level-option']}>
								Уровень:{' '}
								<span className={styles.level}>{userLevel} уровень</span>
							</MainText>
							<MainText size="large" className={styles['level-option']}>
								Пройдено:
								<MainText size="large" className={styles.option}>
									{userLevelPercent}%
								</MainText>
							</MainText>
							<MainText size="large" className={styles['level-option']}>
								Всего изучено карточек:
								<MainText size="large" className={styles.option}>
									{data && data.length}
								</MainText>
							</MainText>
							<MainText size="large" className={styles['level-option']}>
								Опыта до след. уровня:
								<MainText size="large" className={styles.option}>
									{expLeft}
								</MainText>
							</MainText>
						</div>
					</div>
				</div>
				<div className={styles.progress}>
					<MainTitle className={styles['progress-title']}>Прогресс</MainTitle>
					<div className={styles['progress-info']}>
						<MainText size="large" className={styles['progress-option']}>
							Всего создано категорий:{' '}
							<MainText size="large" className={styles.option}>
								{userInfo.createdCategories}
							</MainText>
						</MainText>
						<MainText size="large" className={styles['progress-option']}>
							Всего пройдено категорий:{' '}
							<MainText size="large" className={styles.option}>
								{swipedCategories}
							</MainText>
						</MainText>
						<MainText size="large" className={styles['progress-option']}>
							Всего создано карточек:{' '}
							<MainText size="large" className={styles.option}>
								{userInfo.createdCards}
							</MainText>
						</MainText>
						<MainText size="large" className={styles['progress-option']}>
							Всего пройдено карточек:{' '}
							<MainText size="large" className={styles.option}>
								{userInfo.swiped}
							</MainText>
						</MainText>
					</div>
				</div>
				<div className={styles['english-level']}>
					<MainTitle className={styles.title}>Уровень английского</MainTitle>
					<div className={styles['english-level-info']}>
						<h3 className={styles.level}>{userInfo.currentLevel}</h3>
						<MainText className={styles.info} size="large">
							Ваш уровень английского {userInfo.currentLevel}! Это значит что вы
							знаете от {knowWords} до {knowWords * 1.5} слов. Главное не
							забывать о теории!
						</MainText>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileStatistic;
