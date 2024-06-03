'use client';

import styles from './TrainDonePage.module.scss';
import { useEffect, useState } from 'react';
import cn from 'clsx';
import StatItem from '@/components/model/widgets/StatItem';
import MainTitle from '@/components/model/ui/MainTitle';
import MainButton from '@/components/model/ui/MainButton';
import { LogIn, RotateCcw } from 'lucide-react';
import { ITrainDonePage } from './train-don-page.interface';
import { useRouter } from 'next/navigation';
import useCardCarousel from '@/hooks/useCardCarousel';
import useModalStore from '@/store/useModalStore';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import UserService from '@/services/user.service';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'react-toastify';
import useSwipedCategories from '@/store/useSwipedCategories';
import settings from '@/settings';

const TrainDonePage = ({
	learn,
	know,
	cards,
	onClickReload,
	className,
}: ITrainDonePage) => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));

	const [userLevel, setUserLevel] = useState(0);

	const { data } = useQuery(['getUserInfo', { jwt }], () =>
		UserService.getUser(jwt),
	);

	const router = useRouter();
	const queryClient = useQueryClient();
	const { setIsFinish } = useModalStore(state => state);
	const { setSwipedCategories } = useSwipedCategories(state => state);

	const [first, setFirst] = useState<boolean>();
	const [second, setSecond] = useState<boolean>();
	const [third, setThird] = useState<boolean>();

	const [firstValue, setFirstValue] = useState(0);
	const [secondValue, setSecondValue] = useState(0);
	const [thirdValue, setThirdValue] = useState(0);

	const { translate, counter, setCounter, setTranslate } =
		useCardCarousel(cards);

	const expFromKnow = settings.expAddFromKnowPerCard * know;
	const expFromPassed = settings.expAddFromPassedPerCard * learn;
	const expSum = (expFromKnow + expFromPassed) / 1000;

	const mutateExp = useMutation(() => UserService.postUserGiveExp(jwt, expSum));
	const mutateSwiped = useMutation(() =>
		UserService.postUserAddSwiped(jwt, cards.length),
	);

	useEffect(() => {
		if (data && data.level !== undefined) {
			setUserLevel(Math.floor(data.level));
		}
	}, [data]);

	useEffect(() => {
		setIsFinish(true);
		const showTextSequentially = async () => {
			await delay(500); // Adjust the delay time as needed

			setFirst(true);
			await delay(1000);

			setSecond(true);
			await delay(500);

			setThird(true);

			const runFirstValue = async () => {
				for (let i = firstValue; i <= learn; i++) {
					setFirstValue(i);
					await delay(40);
				}
				if (learn === 0) {
					setSwipedCategories();
				}
			};

			const runSecondValue = async () => {
				for (let i = secondValue; i <= know; i++) {
					setSecondValue(i);
					await delay(40);
				}
			};

			const runThirdValue = async () => {
				for (let i = thirdValue; i <= expSum * 1000; i++) {
					setThirdValue(i);
					await delay(15);
				}
			};

			try {
				const { status } = await mutateExp.mutateAsync();
				if (status !== 200) throw Error;
			} catch {
				toast.warning('Не получилось добавить опыт пользователю');
				return;
			}

			try {
				const { status } = await mutateSwiped.mutateAsync();
				if (status !== 200) throw Error;
			} catch {
				toast.warning('Не получилось пройденые карточки пользователю');
				return;
			}

			await Promise.all([runFirstValue(), runSecondValue(), runThirdValue()]);
		};
		showTextSequentially();
	}, []);

	const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	return (
		<div className={styles.wrapper}>
			<div className={cn(styles['train-done-page'], className)}>
				<h4
					className={cn(
						styles.text,
						first && styles.first,
						second && styles.second,
					)}>
					Тренировка пройдена!
				</h4>

				<div className={cn(styles.info, third && styles['info-ready'])}>
					<div className={styles.stat}>
						<StatItem title="Вы изучаете">
							<MainTitle size="large" className={styles.number}>
								{firstValue}
							</MainTitle>
						</StatItem>
						<StatItem title="Вы прошли">
							<MainTitle size="large" className={styles.number}>
								{secondValue}
							</MainTitle>
						</StatItem>
						<StatItem title="Опыт">
							<MainTitle size="middle" className={styles.number}>
								{thirdValue}
							</MainTitle>
						</StatItem>
					</div>
					<div className={styles['action-buttons']}>
						<MainButton
							color="gray"
							onClick={() => router.replace('/home')}
							className={styles['action-button']}>
							Выйти <LogIn size={20} strokeWidth={3} className={styles.icon} />
						</MainButton>
						{firstValue !== 0 && (
							<MainButton
								onClick={() => {
									queryClient.refetchQueries();
									onClickReload();
									setIsFinish(false);
									setCounter(prev => prev - prev);
									setTranslate(prev => prev - prev);
									console.log(counter, translate);
								}}
								className={styles['action-button']}>
								Заново{' '}
								<RotateCcw size={20} strokeWidth={3} className={styles.icon} />
							</MainButton>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TrainDonePage;
