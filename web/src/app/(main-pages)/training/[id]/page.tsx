import ChoosingPage from '@/page/main/ChoosingPage';

const Page = ({ params }: { params: { id: number } }) => {
	return (
		<div className="flex items-center justify-center h-full">
			<ChoosingPage id={params.id} isTrain />
		</div>
	);
};

export default Page;
