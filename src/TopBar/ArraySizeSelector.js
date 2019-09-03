import React from 'react';
import './ArraySizeSelector.scss';

const ArraySizeSelector = props => {
    return (
        <span id="range">
            <input
                id="slider"
                type="range"
                name="Array Size"
                min={props.min}
                max={props.max}
                step={props.step}
                defaultValue={props.defaultValue}
                onChange={e => props.onChangeHandler(e.target.value)}
            />
            <span id="display">{props.defaultValue}</span>
        </span>
    );
};

export default ArraySizeSelector;
