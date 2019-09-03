import React from 'react';

const SortingAlgorithms = ['Bubble Sort', 'Quick Sort'];

const SortingOptions = SortingAlgorithms.map(algo => (
    <option value={algo}>{algo}</option>
));

const AlgorithmSelector = props => {
    return (
        <select
            name="AlgorithmSelector"
            onChange={e => props.onChangeHandler(e.target.value)}
        >
            {SortingOptions}
        </select>
    );
};

export default AlgorithmSelector;
