'use client';

import UserService from '@/services/user.service';
import useAuthStore from '@/store/useAuthStore';
import useTrainStore from '@/store/useTrainStore';
import { ReactNode, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const useTopCard = ({
	id,
	img,
	children,
	cardIsOpen,
	counter,
	index,
	onClickDone,
}: {
	id: number;
	img: string | undefined;
	children: ReactNode;
	cardIsOpen: boolean;
	counter: number;
	index: number;
	onClickDone: () => void;
}) => {
	const [active, setActive] = useState(false);
	const [volumeActive, setVolumeActive] = useState(false);
	const [imageIsOpen, setImageIsOpen] = useState(false);
	const [translateComplete, setTranslateComplete] = useState(false);
	const { jwt } = useAuthStore(({ jwt }) => ({ jwt }));
	const { addLearned } = useTrainStore(({ addLearned }) => ({ addLearned }));
	const mutate = useMutation((id: number) =>
		UserService.postCardToDictionary(jwt, id),
	);

	function handleClickSpace(e: KeyboardEvent) {
		if (img && e.key === ' ') {
			setImageIsOpen(!imageIsOpen);
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
			setImageIsOpen(false);
		}
	}

	async function handleClickDone(id: number) {
		try {
			addLearned();
			const { status } = await mutate.mutateAsync(id);
			if (status !== 200) throw Error;
		} catch {
			toast.warning('Такое имя уже существует');
			return;
		}
	}

	function handleClickVolume() {
		if (!volumeActive && window.speechSynthesis) {
			const utterance = new SpeechSynthesisUtterance();
			utterance.onstart = () => setVolumeActive(true);
			if (sessionStorage.getItem('side') === 'english') {
				utterance.lang = 'en';
				utterance.rate = 0.7;
				utterance.pitch = 0.5;
			} else {
				utterance.lang = 'ru';
				utterance.pitch = 1.3;
			}
			utterance.text = String(children);
			utterance.onend = () => setVolumeActive(false);
			window.speechSynthesis.speak(utterance);
		} else {
			// eslint-disable-next-line no-console
			console.log('Браузер не поддерживает');
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleClickSpace);
		if (cardIsOpen) {
			setImageIsOpen(false);
		}

		return () => {
			document.removeEventListener('keydown', handleClickSpace);
		};
	}, [imageIsOpen, cardIsOpen]);

	useEffect(() => {
		const handleClickActions = (e: KeyboardEvent) => {
			if ((e.key === 'v' || e.key === 'м') && counter === index) {
				handleClickVolume();
			} else if (
				(e.key === 'b' || e.key === 'и') &&
				counter === index &&
				translateComplete
			) {
				handleClickDone(id);
				onClickDone();
				setActive(!active);
				setTranslateComplete(false);
			}
		};

		document.addEventListener('keydown', handleClickActions);

		return () => {
			document.removeEventListener('keydown', handleClickActions);
		};
	});

	useEffect(() => {
		setTimeout(() => {
			setTranslateComplete(true);
		}, 300);
	}, [active]);

	return {
		active,
		imageIsOpen,
		volumeActive,
		setActive,
		handleClickVolume,
		handleClickDone,
		setImageIsOpen,
	};
};

export default useTopCard;
