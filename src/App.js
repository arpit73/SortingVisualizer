import React from 'react';
import './App.css';
import ArraySizeSelector from './Components/TopBar/ArraySizeSelector';
import AlgorithmSelector from './Components/TopBar/AlgorithmSelector';
import ArrayTypeSelector from './Components/TopBar/ArrayTypeSelector';

class Strip {
    constructor(length = 10, color = 'rgb(25, 125, 51)') {
        this.length = length;
        this.color = color;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arraySize: 10,
            stripsArray: [],
            sortingAlgorithm: 'Bubble Sort',
            arrayType: 'Random'
        };
    }
    surfaceHeight = 500; // px

    componentDidMount = () => {
        this.setState({
            stripsArray: this.generateStripsArray(
                this.state.arraySize,
                this.state.arrayType,
                this.surfaceHeight
            )
        });
    };

    getColor = () => {
        let red = Math.ceil(Math.random() * 250);
        let green = Math.ceil(Math.random() * 250);
        let blue = Math.ceil(Math.random() * 250);
        return `rgb(${red}, ${green}, ${blue})`;
    };

    generateStripsArray = (arraySize, arrayType, maxValue) => {
        let stripLengthArray = [];
        switch (arrayType) {
            case 'Random':
                for (let i = 0; i < arraySize; i++) {
                    stripLengthArray.push(Math.ceil(Math.random() * maxValue));
                }
                break;

            case 'Almost Sorted':
                let increment = (maxValue - 10) / (arraySize - 1);
                for (let val = 10; val <= maxValue; val += increment) {
                    stripLengthArray.push(Math.floor(val));
                }
                [stripLengthArray[2], stripLengthArray[arraySize - 3]] = [
                    stripLengthArray[arraySize - 3],
                    stripLengthArray[2]
                ];
                break;

            case 'Reversed':
                let decrement = (maxValue - 10) / (arraySize - 1);
                for (let val = maxValue; val >= 10; val -= decrement) {
                    stripLengthArray.push(Math.floor(val));
                }
                break;

            default:
                break;
        }

        let max = Math.max(...stripLengthArray);
        let min = Math.min(...stripLengthArray);
        min += 50;
        let scaleFactor = (max - min) / 220;

        let strips = stripLengthArray.map(length => {
            let scaledLength = length - min,
                red = 0,
                green = 255 - Math.floor(scaledLength / scaleFactor),
                blue = 0;
            let color = `rgb(${red}, ${green}, ${blue})`;
            return new Strip(length, color);
        });

        return strips;
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    swap = async (arr, i, j) => {
        [arr[i], arr[j]] = [arr[j], arr[i]];

        await this.sleep(5);
        this.setState({
            stripsArray: arr
        });
    };

    bubbleSort = async arr => {
        let len = arr.length;
        for (let i = len - 1; i >= 0; i--) {
            for (let j = 1; j <= i; j++) {
                let backup_1 = arr[j - 1].color;
                let backup_2 = arr[j].color;

                arr[j - 1].color = 'rgb(2, 12, 51)';
                arr[j].color = 'rgb(225, 125, 51)';
                if (arr[j - 1].length > arr[j].length) {
                    await this.swap(arr, j - 1, j);
                }
                arr[j - 1].color = backup_1;
                arr[j].color = backup_2;
            }
        }
    };

    Strips = () => {
        return this.state.stripsArray.map(strip => {
            const stripStyles = {
                height: `${strip.length}px`,
                backgroundColor: strip.color
            };
            return (
                <span
                    key={Math.ceil(Math.random() * 200000)}
                    className="strip"
                    style={stripStyles}
                ></span>
            );
        });
    };

    handleArraySizeSelector = arraySize => {
        this.setState({
            arraySize: arraySize
        });
    };

    handleAlgorithmSelector = algorithm => {
        this.setState({
            sortingAlgorithm: algorithm
        });
    };

    handleArrayTypeSelector = arrayType => {
        this.setState({
            arrayType: arrayType
        });
    };

    TopBar = () => {
        return (
            <span>
                <ArraySizeSelector
                    min={10}
                    max={200}
                    step={5}
                    defaultValue={this.state.arraySize}
                    onChangeHandler={this.handleArraySizeSelector}
                />

                <AlgorithmSelector
                    onChangeHandler={this.handleAlgorithmSelector}
                />

                <ArrayTypeSelector
                    onChangeHandler={this.handleArrayTypeSelector}
                />
            </span>
        );
    };

    render() {
        const surfaceStyles = {
            width: '80%',
            height: `${this.surfaceHeight}px`,
            backgroundColor: 'white'
        };

        return (
            <div>
                <this.TopBar />
                <span className="surface" ref="surface" style={surfaceStyles}>
                    <this.Strips />
                </span>
                <button onClick={() => this.bubbleSort(this.state.stripsArray)}>
                    Sort
                </button>
            </div>
        );
    }
}

export default App;
