import ChoosingPage from '@/page/main/ChoosingPage';

const Category = ({ params }: { params: { id: number } }) => {
	return (
		<div className="flex items-center justify-center h-full">
			<ChoosingPage id={params.id} />
		</div>
	);
};

export default Category;
