import React from 'react';

import AlgorithSelector from './AlgorithmSelector';
import ArraySizeSelector from './ArraySizeSelector';
import ArrayTypeSelector from './ArrayTypeSelector';

const TopBar = () => {
    return (
        <span>
            {/* <AlgorithSelector /> */}
            <ArraySizeSelector min={10} max={400} step={5}/>
            {/* <ArrayTypeSelector /> */}
        </span>
    );
};

export default TopBar;
