import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import styles from './ArrowButton.module.css';

const ArrowButton = ({
    children,
    handleClick,
    type = 'button',
    color,
    size,
    arrow,
    disabled = false
}) => {
    const classes = `${styles.Button} ${styles[color] || ''} ${styles[size] || ''}`;
    
    const buttonValue = () => {
        switch(arrow) {
            case 'none':
                return children;
            case 'back':
                return <><AiOutlineArrowLeft />&nbsp;{children}</>;
            default:
                return <>{children}&nbsp;<AiOutlineArrowRight /></>;
        }
    };

    return (
        <button
            type={type}
            className={classes}
            onClick={handleClick}
            disabled={disabled}
        >
        {buttonValue()}
        </button>
    );
};

export default React.memo(ArrowButton);