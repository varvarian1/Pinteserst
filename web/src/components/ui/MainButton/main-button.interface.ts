import { ReactNode } from 'react';

interface IMainButton {
	className?: string;
	onClick?: () => void;
	type: 'submit' | 'reset' | 'button' | undefined;
	children: ReactNode;
}
export default IMainButton;
