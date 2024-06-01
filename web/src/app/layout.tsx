'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import StoreProvider from '@/app/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = new QueryClient();

export default function RootLayout({ children }: ILayout) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/img/favicon.ico" />
				<title>RestInPist</title>
			</head>
			<QueryClientProvider client={client}>
				<body className={inter.className}>
					<StoreProvider>{children}</StoreProvider>
				</body>
			</QueryClientProvider>
		</html>
	);
}
