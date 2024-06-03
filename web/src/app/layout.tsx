'use client';

import { ReactNode } from 'react';
import { Inter, Istok_Web } from 'next/font/google';
import './globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import cn from 'clsx';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

axios.defaults.baseURL = 'http://localhost:8010/proxy';

const client = new QueryClient();

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ru">
			<head>
				<link rel="icon" href="/img/favicon.ico" />
				<title>EnglishCards</title>
			</head>
			<QueryClientProvider client={client}>
				<ThemeProvider attribute="data-theme" defaultTheme="light">
					<body className={cn(inter.className)}>{children}</body>
				</ThemeProvider>
			</QueryClientProvider>
		</html>
	);
}
