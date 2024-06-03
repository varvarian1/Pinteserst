'use client';

import { Lato } from 'next/font/google';
import './globals.css';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import StoreProvider from '@/app/StoreProvider';

const inter = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
});

axios.defaults.baseURL = 'http://localhost:8000';
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
				<StoreProvider>
					<body className={inter.className}>{children}</body>
				</StoreProvider>
			</QueryClientProvider>
		</html>
	);
}
