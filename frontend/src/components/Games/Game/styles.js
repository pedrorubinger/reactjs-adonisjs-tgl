import styled from 'styled-components';

export const MarkerBox = styled.div`
    display: flex;
    align-items: center;

    .Marker {
        width: 6px;
        height: 94px;
        border-radius: 100px;
        opacity: 1;
        margin-right: 18px;
        background-color: ${(props) => props.color};
    }

    .CartMarker {
        border-radius: 100px 0px 0px 100px;
        width: 4px;
        height: 86px;
        margin-right: 18px;
        background-color: ${(props) => props.color};
    }

    & svg {
        margin-right: 10px;
        cursor: pointer;
    }
`;

export const TypeTitle = styled.h3`
    color: ${(props) => props.color};
    font-style: italic;
`;