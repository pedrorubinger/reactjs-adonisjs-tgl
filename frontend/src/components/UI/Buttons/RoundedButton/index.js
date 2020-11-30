import React from 'react';

import StyledButton from './styles';

const RoundedButton = ({
    children,
    handleClick,
    color = 'default',
    active,
    type = 'button',
    size = 'normal',
    radius = 'default',
    disabled = false
}) => {
    const sizeObj = {
        'small': { font: '14px', width: '113px', height: '34px' },
        'normal': { font: '16px', width: '135px', height: '52px' },
        'big': { font: '16px', width: '209px', height: '52px' }
    };

    return (
        <StyledButton
            type={type}
            color={color}
            bg={active}
            size={sizeObj[size]}
            radius={radius}
            onClick={handleClick}
            disabled={disabled}
        >{children}</StyledButton>
    );
};

export default RoundedButton;