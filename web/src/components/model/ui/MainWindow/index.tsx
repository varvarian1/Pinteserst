'use client';

import MainModalWindow from '../../widgets/MainModalWindow';
import { IMainWindow } from './main-window.interface';
import styles from './MainWindow.module.scss';
import cn from 'clsx';
import useModalStore from '@/store/useModalStore';
import Header from '../../widgets/Header';

const MainWindow = ({ children, title }: IMainWindow) => {
	const { oneCardModal, noCardsModal, setOneCardModal, setNoCardModal } =
		useModalStore(state => state);

	return (
		<div className={styles.window}>
			<Header>{title}</Header>
			<div
				className={cn(
					styles['window-container'],
					window.innerWidth < 600 && 'ml-[10px]',
				)}>
				<main className={styles['window-main']}>{children}</main>
				<MainModalWindow
					theme={oneCardModal ? 'primary' : 'secondary'}
					onClose={() => {
						setOneCardModal(false);
						setNoCardModal(false);
					}}
					className={cn(
						oneCardModal || noCardsModal
							? styles['confirm-modal']
							: styles['confirm-modal_off'],
					)}>
					{oneCardModal
						? 'В этой категории всего одна карточка! Вы уверены что хотите продолжить?'
						: 'В данной категории нету карточек!'}
				</MainModalWindow>
			</div>
		</div>
	);
};

export default MainWindow;
