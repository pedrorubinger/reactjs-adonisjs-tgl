import styled from 'styled-components';

const StyledButton = styled.button`
    color: ${(props) => props.bg ? '#FFFFFF' : props.color};
    background: ${(props) => props.bg ? props.color : '#FFFFFF'} 0% 0% no-repeat padding-box;
    border: 2px solid ${(props) => props.color || '#4e9fce'};
    border-radius: ${(props) => props.radius === 'rounded' ? '100px' : '10px'};
    font: normal normal bold ${(props) => props.size.font} 'Helvetica Neue', Arial, sans-serif;
    transition: .5s;
    padding: ${(props) => props.radius === 'rounded' ? '10px' : '15px'} 30px;

    &:hover {
        background-color: ${(props) => props.color};
        color: #FFFFFF;
    }

    &:disabled {
        opacity: .6;
    }
    
    &:disabled:hover {
        cursor: default;
    }
`;

export default StyledButton;