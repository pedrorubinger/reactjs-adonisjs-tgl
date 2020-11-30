import React from 'react';

import styles from './Loading.module.css';

const Loading = ({ message = 'Please wait. The page is loading...' }) => {
    return (
        <div className={styles.Container}>
            <h2>{message}</h2>
            <div className={styles.Roller}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;