import React from 'react';
import './Dropdown.scss';
import SortingAlgorithms from './SortingAlgorithms';

const SortingOptions = SortingAlgorithms.map(algo => (
    <option value={algo.name}>{algo.name}</option>
));

const AlgorithmSelector = props => {
    const sendAlgorithm = value => {
        const Algorithm = SortingAlgorithms.find(
            Algorithm => Algorithm.name === value
        );
        props.onChangeHandler(Algorithm);
    };
    return (
        <select
            name="AlgorithmSelector"
            onChange={e => sendAlgorithm(e.target.value)}
        >
            {SortingOptions}
        </select>
    );
};

export default AlgorithmSelector;
