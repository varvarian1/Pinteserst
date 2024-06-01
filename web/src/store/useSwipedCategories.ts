import { create } from 'zustand';

interface IUseSwipedCategories {
	swipedCategories: number;

	setSwipedCategories: () => void;
}

const useSwipedCategories = create<IUseSwipedCategories>(set => ({
	swipedCategories: 0,
	setSwipedCategories: () =>
		set(state => ({ swipedCategories: state.swipedCategories + 1 })),
}));

export default useSwipedCategories;
