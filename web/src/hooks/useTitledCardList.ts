import { useEffect, useRef, useState } from 'react';

function useTitledCardList() {
	const [numOfCards, setNumOfCards] = useState(0);
	const ulRef = useRef<HTMLUListElement>(null);
	const [ulWidth, setUlWidth] = useState(0);

	useEffect(() => {
		if (ulRef.current) {
			setUlWidth(ulRef.current.offsetWidth);
		}
	}, [ulRef.current]);

	useEffect(() => {
		const calculateNumOfCards = () => {
			const newNumOfCards = parseInt(
				(document.body.clientWidth / 256 - 3).toString(),
				10,
			);
			setNumOfCards(newNumOfCards);
		};

		calculateNumOfCards();
		window.addEventListener('resize', calculateNumOfCards);

		return () => {
			window.removeEventListener('resize', calculateNumOfCards);
		};
	}, []);

	return {
		numOfCards,
		ulRef,
		ulWidth,
	};
}
export default useTitledCardList;
