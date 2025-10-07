import React from 'react';

export default (props) => {
    return (
        <div>
            <input 
            {...props.input} 
            className='form-control' 
            placeholder={props.placeholder}
            readOnly={readOnly}
            type={props.type}
            />
        </div>
    )
}