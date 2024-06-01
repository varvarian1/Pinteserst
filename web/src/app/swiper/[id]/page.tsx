import SliderPage from '@/page/main/SliderPage';

const SwiperPage = ({ params }: { params: { id: number } }) => {
	return <SliderPage id={params.id} />;
};

export default SwiperPage;
