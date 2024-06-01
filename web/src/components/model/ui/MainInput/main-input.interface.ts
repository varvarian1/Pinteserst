import { InputHTMLAttributes, RefAttributes } from 'react';

export interface IMainInput
	extends InputHTMLAttributes<HTMLInputElement>,
		RefAttributes<HTMLInputElement> {
	type: 'email' | 'text' | 'password';
	placeholder: string;
	className?: string;
}
