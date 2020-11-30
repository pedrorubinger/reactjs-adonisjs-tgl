import React, { useEffect } from 'react';

import styles from './ProgressBar.module.css';

const ProgressBar = () => {
    useEffect(() => {
        const bar = document.getElementById('progress');
        const frame = () => {
            if(progress >= 85) clearInterval(id);
            else bar.style.width = `${++progress}%`;
        };

        let progress = 1;
        const id = setInterval(frame, 100);

        return () => clearInterval(id);
    }, []);

    return (
        <div className={styles.Container}>
            <div id="progress" className={styles.ProgressArea} />
        </div>
    );
};

export default ProgressBar;