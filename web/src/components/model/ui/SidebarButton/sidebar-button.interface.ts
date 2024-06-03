import { ReactNode } from 'react';

export interface ISidebarButton {
	children: ReactNode;
	onClick?: () => void;
	href?: string;
	title: string;
	active?: boolean;
	className?: string;
}
