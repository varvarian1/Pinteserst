import TrainingPage from '@/page/main/TrainingPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Тренировка',
};

const Page = () => {
	return <TrainingPage />;
};

export default Page;
