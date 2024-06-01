import EditCategoryPage from '@/page/main/EditCategoryPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Редактирование категории',
};

const EditCategory = ({ params }: { params: { id: number } }) => {
	return <EditCategoryPage id={params.id} />;
};

export default EditCategory;
