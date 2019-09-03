import React from 'react';

const ArrayTypes = ['Random', 'Almost Sorted', 'Reversed'];
const TypeOptions = ArrayTypes.map(type => (
    <option value={type}>{type}</option>
));

const ArrayTypeSelector = props => (
    <select
        name="ArrayTypeSelector"
        onChange={e => props.onChangeHandler(e.target.value)}
    >
        {TypeOptions}
    </select>
);

export default ArrayTypeSelector;
