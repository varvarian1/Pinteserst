import { ReactNode } from 'react';

interface IMainButton {
	className?: string;
	onClick?: () => void;
	children: ReactNode;
}
export default IMainButton;
