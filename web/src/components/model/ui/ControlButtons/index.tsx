'use client';

import { LogOut, RotateCcw, ShuffleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IControlButtons } from './control-buttons.interface';
import useCtrlButtonsKeyboard from '@/hooks/useCtrlButtonsKeyboard';
import styles from './ControlButtons.module.scss';
import cn from 'clsx';

function ControlButtons({
	onClickShuffle,
	onClickReload,
	onClickExit,
	className = '',
	cards,
}: IControlButtons) {
	const router = useRouter();
	useCtrlButtonsKeyboard({ cards, router, onClickReload, onClickShuffle });

	return (
		<div className={cn(styles.buttons, className)}>
			<ShuffleIcon
				stroke="var(--color-icons)"
				size="25px"
				strokeWidth={3}
				className={styles.btn}
				onClick={onClickShuffle}
			/>
			<RotateCcw
				stroke="var(--color-icons)"
				size="25px"
				strokeWidth={3}
				className={styles.btn}
				onClick={onClickReload}
			/>
			<LogOut
				stroke="var(--color-icons)"
				size="25px"
				strokeWidth={3}
				className={styles.btn}
				onClick={onClickExit}
			/>
		</div>
	);
}

export default ControlButtons;
