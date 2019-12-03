import React from 'react';

const Checkbox = ({children, name, onChange}) => {
    return (
        <label>
            <input type="checkbox" name={name} defaultChecked={true} onChange={(e) => onChange(e.target.checked, name)}/>
            {children}
        </label>
    )
};

export default Checkbox;