'use client';

import { IMainModalWindow } from './MainModalWindow.interface';
import cn from 'clsx';
import styles from './MainModalWindow.module.scss';
import MainTitle from '../../ui/MainTitle';
import MainButton from '../../ui/MainButton';
import { useRouter } from 'next/navigation';
import useModalStore from '@/store/useModalStore';

const MainModalWindow = ({
	children,
	theme = 'primary',
	className,
	onClose,
}: IMainModalWindow) => {
	const router = useRouter();
	const { id, exitModal } = useModalStore(state => state);
	const cls = cn(
		styles['modal-window'],
		theme && styles[`modal-window__${theme}`],
	);

	return (
		<div className={cn(styles.container, className)}>
			<div className={cls}>
				<MainTitle className={styles.title}>{children}</MainTitle>
				{theme === 'primary' ? (
					<div className={styles.buttons}>
						<MainButton onClick={onClose} color="gray">
							Нет
						</MainButton>
						<MainButton
							onClick={() => {
								exitModal
									? router.push('/home')
									: router.push(`/categories/${id}`);
								onClose();
							}}>
							Да
						</MainButton>
					</div>
				) : (
					<div className={styles.buttons}>
						<MainButton onClick={onClose}>ОК</MainButton>
					</div>
				)}
			</div>
			<button
				className={cn(styles['container-delete'])}
				type="button"
				aria-label="Button close"
				onClick={onClose}
			/>
		</div>
	);
};

export default MainModalWindow;
