import React, { useState } from 'react';

const Checkbox = ({children, checkboxChangeHandler, name, ...props}) => {
    const [ isChecked, setChecked ] = useState(true);

    const handleCheckboxChange = () => {
        setChecked(isChecked => !isChecked);
        checkboxChangeHandler(name, isChecked);
    };

    return (
        <label>
            <input type="checkbox" checked={isChecked} {...props} onChange={handleCheckboxChange}/>
            {children}
        </label>
    )
};

export default Checkbox;