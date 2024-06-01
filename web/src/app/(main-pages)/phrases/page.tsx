import PhrasesPage from '@/page/main/PhrasesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Разговорные фразы',
};

const Page = () => {
	return <PhrasesPage />;
};

export default Page;
