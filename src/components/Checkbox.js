import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: .2s;
    &:hover {
        opacity: 0.8;
    }
`;

const StyledInput = styled.input`
    cursor: pointer;
`;

const Checkbox = ({children, name, onChange}) => {
    return (
        <StyledLabel>
            <StyledInput type="checkbox" name={name} defaultChecked={true} onChange={(e) => onChange(e.target.checked, name)}/>
            {children}
        </StyledLabel>
    )
};

export default Checkbox;