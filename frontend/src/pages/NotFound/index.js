import React from 'react';

import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                <div className={styles.MessageBox}>
                    <h1 className={styles.Title}>404</h1>
                    <p className={styles.Message}>
                        We're sorry, the page you requested could not be found.
                        Please go back to the home page or contact us at contact@tgl.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;