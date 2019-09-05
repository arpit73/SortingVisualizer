import React from 'react';

const ArraySizeSelector = props => {
    return (
        <span>
            <input
                type="range"
                name="Array Size"
                min={props.min}
                max={props.max}
                step={props.step}
                defaultValue={props.defaultValue}
                onChange={e => props.onChangeHandler(e.target.value)}
            />
        </span>
    );
};

export default ArraySizeSelector;
