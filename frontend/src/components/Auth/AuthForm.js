import React from 'react';

import styles from './Auth.module.css';

const AuthForm = ({ children, handleSubmit }) => (
    <form onSubmit={handleSubmit} className={styles.Form}>{children}</form>
);

export default AuthForm;