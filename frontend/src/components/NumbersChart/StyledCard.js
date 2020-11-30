import styled from 'styled-components';

const Card = styled.div`
    background: #ADC0C4 0% 0% no-repeat padding-box;
    margin: 8px 0;
    border-radius: 50%;
    border: 1px solid #afbcbe;
    width: 63px;
    height: 65px;
    text-align: center;
    transition: .5s;
    color: #FFFFFFFF;
    cursor: pointer;

    & span {
        text-align: left;
        font: normal normal bold 20px 'Helvetica Neue', Arial, sans-serif;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
        line-height: 65px;
    }
    
    &:hover {
        background-color: #73a2aa;
    }

    &.Picked {
        background-color: ${(props) => props.color};
    }

    &.Picked:hover {
        background-color: #06a2db;
    }

    @media (max-width: 660px) {
        width: 53px;
        height: 55px;

        & span {
            line-height: 53px;
            font-size: 16px;
        }
    }

    @media (max-width: 410px) {
        width: 43px;
        height: 45px;

        & span {
            line-height: 43px;
            font-size: 13px;
        }
    }
`;

export default Card;