'use client';

import { ISwiperCard } from '@/components/model/widgets/Swiper/swiper.interface';
import { useEffect, useMemo, useState } from 'react';

function useCardCarousel(cards: ISwiperCard[]) {
	const [translate, setTranslate] = useState(0);
	const [counter, setCounter] = useState(0);
	const [translateCompleted, setTranslateCompleted] = useState(true);
	const [progress, setProgress] = useState(0);
	const [cardsArray, setCardsArray] = useState(cards);
	const [showDone, setShowDone] = useState(false);

	const memoizedCards = useMemo(() => cards, [cards]);

	function handleClickArrow(left: boolean, right: boolean) {
		if (left && counter !== 0 && translateCompleted) {
			setTranslate(prev => prev - 756);
			setCounter(prev => prev - 1);
			setTranslateCompleted(false);
		} else if (right && counter !== cards.length && translateCompleted) {
			setTranslate(prev => prev + 756);
			setCounter(prev => prev + 1);
			console.log(translate, counter);
			setTranslateCompleted(false);
		}
	}

	function handleClickShuffle() {
		setCounter(prev => prev - prev);
		setTranslate(prev => prev - prev);
		setCardsArray([...cardsArray].sort(() => Math.random() - 0.5));
		cards.sort(() => Math.random() - 0.5);
	}

	useEffect(() => {
		const handelClickRight = (e: KeyboardEvent) => {
			if (
				e.key === 'ArrowRight' &&
				counter !== cards.length &&
				translateCompleted
			) {
				setTranslate(prev => prev + 756);
				setCounter(prev => prev + 1);
				setTranslateCompleted(false);
			} else if (
				e.key === 'ArrowLeft' &&
				counter !== 0 &&
				counter !== cards.length &&
				translateCompleted
			) {
				setTranslate(prev => prev - 756);
				setCounter(prev => prev - 1);
				setTranslateCompleted(false);
			}
		};

		document.addEventListener('keydown', handelClickRight);
		setProgress((window.innerWidth / memoizedCards.length) * counter);

		return () => {
			document.removeEventListener('keydown', handelClickRight);
		};
	}, [memoizedCards.length, counter, translate, translateCompleted]);

	useEffect(() => {
		setTimeout(() => {
			setTranslateCompleted(true);
		}, 300);
	}, [translate, memoizedCards]);

	return {
		translate,
		counter,
		translateCompleted,
		progress,
		showDone,
		cardsArray,
		setShowDone,
		setTranslate,
		setCounter,
		setCardsArray,
		handleClickArrow,
		handleClickShuffle,
	};
}

export default useCardCarousel;
