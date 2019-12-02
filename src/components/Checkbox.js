import React, { useState } from 'react';

const Checkbox = ({children, ...props}) => {
    const [ isChecked, setChecked ] = useState(true);
    return (
        <label>
            <input type="checkbox" checked={isChecked} {...props} onChange={() => setChecked(!isChecked)}/>
            {children}
        </label>
    )
};

export default Checkbox;