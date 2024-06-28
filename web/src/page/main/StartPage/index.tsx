import styles from './StartPage.module.scss';
import { TextField } from '@mui/material';

const StartPage = () => {
	return (
		<div>
			<h1>StartPage</h1>
			<TextField
				className={styles.start}
				id="outlined-basic"
				label="Outlined"
				color={'secondary'}
				variant="outlined"
			/>
		</div>
	);
};

export default StartPage;
