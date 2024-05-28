import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Start page',
	description: 'Start page',
};

export default function RootLayout({ children }: ILayout) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
