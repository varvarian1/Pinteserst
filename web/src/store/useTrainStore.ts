import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface IUseTrainStore {
	learning: number;
	learned: number;
	addLearned: () => void;
	setLearned: (newLearned: number) => void;
	setLearning: (setLearning: number) => void;
}

const useTrainStore = create<
	IUseTrainStore,
	[['zustand/persist', IUseTrainStore]]
>(
	persist(
		(set, get) => ({
			learning: 0,
			learned: 0,
			addLearned: () => {
				set(() => ({
					learned: get().learned + 1,
					learning: get().learning - 1,
				}));
			},
			setLearned: (newLearned: number) => {
				set(() => ({
					learned: newLearned,
				}));
			},
			setLearning: (setLearning: number) => {
				set(() => ({
					learning: setLearning,
				}));
			},
		}),
		{
			name: 'train',
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useTrainStore;
