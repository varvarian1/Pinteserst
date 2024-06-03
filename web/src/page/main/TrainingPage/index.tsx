'use client';

import CardList from '@/components/model/widgets/CardList';
import { useQuery } from 'react-query';
import useAuthStore from '@/store/useAuthStore';
import TrainService from '@/services/train.service';

const TrainingPage = () => {
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const trains = useQuery(['getTrains', { jwt }], () =>
		TrainService.getTrain(jwt),
	);
	return <CardList trains={trains.data} type="train" href="" />;
};

export default TrainingPage;
