import styles from './loader.module.scss';

const Loader = () => {
	return (
		<div className={styles.loader}>
			<div className={styles['lds-ellipsis']}>
				<div />
				<div />
				<div />
				<div />
			</div>
		</div>
	);
};

export default Loader;
