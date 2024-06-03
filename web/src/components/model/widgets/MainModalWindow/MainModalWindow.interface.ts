import { ComponentTheme } from '@/config/component-theme.type';
import { ReactNode } from 'react';

export interface IMainModalWindow {
	children: ReactNode;
	theme?: ComponentTheme;
	className?: string;
	onClose: () => void;
}
