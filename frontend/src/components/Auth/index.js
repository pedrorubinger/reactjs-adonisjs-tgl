import React from 'react';

import styles from '../../components/Auth/Auth.module.css';
import Slogan from '../UI/Slogan';

const AuthContainer = ({ title, children, slogan = true }) => (
    <div className={styles.AuthContainer}>
        { slogan && <Slogan /> }

        <div className={styles.AuthContent}>
            <h2 className={styles.Title}>{title}</h2>
            {children}
        </div>
    </div>
);

export default AuthContainer;