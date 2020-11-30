import React from 'react';

import styles from './ErrorContainer.module.css';
import ErrorBox from '../ErrorBox';

const ErrorContainer = ({ error }) => (
    <div className={styles.Container}>
        <h2>Oh, no! Something went wrong!</h2>
        <ErrorBox errors={{ error }} />
    </div>
);

export default ErrorContainer;