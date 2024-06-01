import { InputHTMLAttributes } from 'react';

export interface IImageInput extends InputHTMLAttributes<HTMLInputElement> {
	imageUrl: string;
	className?: string;
}
