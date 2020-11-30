import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

import styles from './ErrorBox.module.css';

const ErrorBox = React.memo(({ errors }) => {
    return (
        <div className={styles.ErrorBox}>    
            {Object.keys(errors).map((error) => (
                 <p key={error} className={styles.ErrorMessage}>
                    <BiErrorCircle />&nbsp;&nbsp;{errors[error]}
                </p>
            ))}
        </div>
    );
});

export default ErrorBox;