import React from 'react';

import styles from './Logo.module.css';

const Logo = () => (
    <div className={styles.Logo}>
        <h2 className={styles.Title}>TGL</h2>
        <div className={styles.Marker} />
    </div>
);

export default Logo;