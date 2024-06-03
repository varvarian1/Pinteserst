import EditIncategoryPage from '@/page/main/EditIncategoryPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Редактирование карточки',
};

const EditIncategory = ({ params }: { params: { id: number } }) => {
	return <EditIncategoryPage id={params.id} />;
};

export default EditIncategory;
