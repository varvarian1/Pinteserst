import HomePage from '@/page/main/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Главная',
};

const Page = () => {
	return <HomePage />;
};

export default Page;
