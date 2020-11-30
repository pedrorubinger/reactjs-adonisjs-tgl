import React from 'react';

import styles from './Slogan.module.css';

const Slogan = () => (
    <div className={styles.Container}>
        <h1 className={styles.Title}>
            The<br />
            Greatest<br />
            App
        </h1>

        <button className={styles.ButtonTitle}>
            for
        </button>

        <span className={styles.Span}>Lottery</span>
    </div>      
);

export default Slogan;