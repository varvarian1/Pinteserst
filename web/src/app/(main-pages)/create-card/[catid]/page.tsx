import CreateCard from '@/page/main/CreateCardPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Создание карточки',
};

const CreateCardPage = ({ params }: { params: { catid: number } }) => {
	return <CreateCard catid={params.catid} />;
};

export default CreateCardPage;
