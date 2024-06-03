import CategoriesPage from '@/page/main/CategoriesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Категории',
};

const Page = () => {
	return <CategoriesPage />;
};

export default Page;
