import { ReactNode } from 'react';

interface IMainButton {
	className?: string;
	onClick?: () => void;
	type: 'submit' | 'reset' | 'button' | undefined;
	disabled?: boolean;
	children: ReactNode;
}
export default IMainButton;
