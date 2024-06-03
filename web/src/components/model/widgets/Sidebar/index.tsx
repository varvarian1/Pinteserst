'use client';

import cn from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SidebarButton from '../../ui/SidebarButton';
import MAIN_BUTTONS from './main-buttons.data';
import styles from './Sidebar.module.scss';
import {
	Menu,
	Moon,
	PanelRightClose,
	PanelRightOpen,
	Settings,
	Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import useModalStore from '@/store/useModalStore';

const Sidebar = () => {
	const path = usePathname();
	const [isOpen, setIsOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const [themeName, setThemeName] = useState('Темная тема');
	const { setNoCardModal, setOneCardModal } = useModalStore(state => state);

	useEffect(() => {
		if (theme === 'dark') {
			setThemeName('Светлая тема');
		}
	}, []);

	return (
		<div
			className={cn(
				styles['sidebar-wrapper'],
				window.innerWidth < 600 && !isOpen
					? styles.burger
					: styles['burger-open'],
			)}>
			{window.innerWidth < 600 && (
				<button
					className={styles['burger-button']}
					onClick={() => setIsOpen(!isOpen)}>
					<Menu size={30} />
				</button>
			)}
			<aside
				className={cn(
					window.innerWidth < 600 ? styles['sidebar-mini'] : styles.sidebar,
					isOpen && window.innerWidth > 600
						? 'max-w-250'
						: !isOpen && window.innerWidth > 600 && 'max-w-60',
					isOpen && window.innerWidth < 600 && styles.open,
				)}>
				<div
					className={cn(
						window.innerWidth < 600
							? styles['sidebar-holder-mini']
							: styles['sidebar-holder'],
						window.innerWidth < 600 && isOpen && styles['sidebar-holder-invis'],
						window.innerWidth < 600 && styles['sidebar-mini-holder'],
					)}>
					<div className={styles['main-buttons']}>
						{MAIN_BUTTONS.map(item => (
							<SidebarButton
								href={item.url}
								title={item.title}
								active={path === item.url}
								className={styles.button}
								onClick={() => {
									window.innerWidth < 600 && isOpen && setIsOpen(false);
									setNoCardModal(false);
									setOneCardModal(false);
								}}
								key={item.url}>
								<item.Icon
									size={22}
									className={path === item.url ? styles.active : ''}
								/>
							</SidebarButton>
						))}
					</div>
					<div className={styles['additional-buttons']}>
						{window.innerWidth > 600 && (
							<SidebarButton
								title="Закрыть панель"
								onClick={() => {
									setIsOpen(!isOpen);
								}}
								className={styles.button}>
								{!isOpen ? (
									<PanelRightClose size={22} />
								) : (
									<PanelRightOpen size={22} />
								)}
							</SidebarButton>
						)}
						<SidebarButton
							title={themeName}
							onClick={() => {
								console.log(theme);
								themeName === 'Светлая тема'
									? setTheme('light')
									: setTheme('dark');
								themeName === 'Темная тема'
									? setThemeName('Светлая тема')
									: setThemeName('Темная тема');
							}}
							className={styles.button}>
							{themeName === 'Темная тема' ? (
								<Moon size={22} />
							) : (
								<Sun size={22} />
							)}
						</SidebarButton>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
