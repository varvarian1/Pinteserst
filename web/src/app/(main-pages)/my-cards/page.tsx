import AllCardsPage from '@/page/main/AllCardsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Мои карточки',
};

const Page = () => {
	return <AllCardsPage />;
};

export default Page;
