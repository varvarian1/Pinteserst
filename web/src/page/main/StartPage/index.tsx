'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './StartPage.module.scss';
import MainText from '@/components/model/ui/MainText';
import MainTitle from '@/components/model/ui/MainTitle';
import { useTheme } from 'next-themes';

const StartPage = () => {
	const { theme, setTheme } = useTheme();

	console.log(theme);

	return (
		<div className={styles.container}>
			<div className={styles.start}>
				<header className={styles.header}>
					<div className={styles.header__container}>
						<div className={styles.header__holder}>
							<Image
								className={styles.logo}
								src={theme == 'dark' ? '/img/logo-white.svg' : '/img/logo1.svg'}
								width={240}
								height={100}
								alt="English cards logo"
							/>
							<nav className={styles.header__nav}>
								<Link
									href="/login"
									className={styles.header__button}
									type="button">
									Войти
								</Link>
							</nav>
						</div>
					</div>
				</header>
				<main className={styles.main}>
					<div className={styles.main__start}>
						<div className={styles.main__container}>
							<div className={styles.main__info}>
								<h1 className={styles.main__title}>Изучай английский просто</h1>
								<h3 className={styles.main__subtitle}>
									на идеальной для этого платформе
								</h3>
								<Link className={styles.main__button} href="/login">
									НАЧАТЬ ПРЯМО СЕЙЧАС
								</Link>
							</div>
							<Image
								className={styles.main__image}
								width={285}
								height={535}
								src="/img/human.svg"
								alt="Person image"
							/>
						</div>
					</div>
					<div className={styles.cards}>
						<div className={styles.cards__container}>
							<div className={styles.cards__card}>
								<p className={styles.cards__text}>
									Изучай пока едешь на работу!
								</p>
							</div>
							<div className={styles.cards__card}>
								<p className={styles.cards__text}>
									Быстрее обучения не бывает!
								</p>
							</div>
							<div className={styles.cards__card}>
								<p className={styles.cards__text}>
									Забыл как правильно произнести? ПОВТОРИ!
								</p>
							</div>
							<div className={styles.cards__card}>
								<p className={styles.cards__text}>Посмотри свой прогресс!</p>
							</div>
							<div className={styles.cards__card}>
								<p className={styles.cards__text}>Добавь картинку к слову!</p>
							</div>
						</div>
					</div>
					<div className={styles.main__creators}>
						<div className={styles['main__container-creators']}>
							<MainTitle className={styles['main__creators-title']}>
								Создатели сайта
							</MainTitle>
							<div className={styles.creators}>
								<div className={styles.creator}>
									<Image
										className={styles.creator__image}
										src="/img/image-nert1n.png"
										width={200}
										height={200}
										alt="Creator image"
									/>
									<a
										className={styles.creator__name}
										href="https://github.com/nert1n">
										<MainTitle>Максим Батурин</MainTitle>
									</a>
								</div>
								<div className={styles.creator}>
									<Image
										className={styles.creator__image}
										src="/img/image-kaden_.png"
										width={200}
										height={200}
										alt="Creator image"
									/>
									<a
										className={styles.creator__name}
										href="https://github.com/Kaden09">
										<MainTitle>Максим Волков</MainTitle>
									</a>
								</div>
								<div className={styles.creator}>
									<Image
										className={styles.creator__image}
										src="/img/image-Uzi82.png"
										width={200}
										height={200}
										alt="Creator image"
									/>
									<a
										className={styles.creator__name}
										href="https://github.com/Uzi82">
										<MainTitle>Сергей</MainTitle>
									</a>
								</div>
							</div>
						</div>
					</div>
				</main>
				<footer className={styles.footer}>
					<div className={styles.footer__container}>
						<div className={styles.footer__holder}>
							<a
								className={styles.footer__link}
								href="https://github.com/Kaden09/EnglishCards"
								target="_blank"
								rel="noreferrer">
								<MainText color="blue">GitHub</MainText>
							</a>
							<MainText className={styles.footer__year}>2024</MainText>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default StartPage;
