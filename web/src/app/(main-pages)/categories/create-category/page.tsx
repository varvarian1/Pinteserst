import CreateCategoryPage from '@/page/main/CreateCategoryPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Создание категории',
};

const Page = () => {
	return <CreateCategoryPage />;
};

export default Page;
