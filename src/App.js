import React from 'react';

import './styles/globals.scss';
import './App.scss';

import ArraySizeSelector from './TopBar/ArraySizeSelector';
import AlgorithmSelector from './TopBar/AlgorithmSelector';
import ArrayTypeSelector from './TopBar/ArrayTypeSelector';
import SortingAlgorithms from './TopBar/SortingAlgorithms';

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
            arraySize: 100,
            stripsArray: [],
            sortingAlgorithm: SortingAlgorithms[0],
            arrayType: 'Random',
            currentlySorting: false
        };
        this.surfaceHeight = window.innerHeight / 1.3;
    }

    componentDidMount = () => {
        this.setState({
            stripsArray: this.generateStripsArray(
                this.state.arraySize,
                this.state.arrayType,
                this.surfaceHeight
            )
        });
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

                let firstIndex = 2,
                    secondIndex = arraySize - 3;

                [
                    stripLengthArray[firstIndex],
                    stripLengthArray[secondIndex]
                ] = [
                    stripLengthArray[secondIndex],
                    stripLengthArray[firstIndex]
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

        // let scaleFactor = maxValue / 10;

        let strips = stripLengthArray.map(length => {
            // let hue = 0,
            //     saturation = 100,
            //     luminosity = length / scaleFactor + 90;
            // let color = `hsl(${hue}, ${saturation}%, ${luminosity}%)`;
            let color = 'white';
            return new Strip(length, color);
        });

        return strips;
    };

    sleep(ms = 0) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            var r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    Swap = async (arr, i, j) => {
        if (this.state.currentlySorting) {
            arr[i].color = 'red';
            arr[j].color = 'red';

            for (let k = i + 1; k < j; k++) {
                arr[k].color = 'pink';
            }

            [arr[i], arr[j]] = [arr[j], arr[i]];

            this.setState({
                stripsArray: arr
            });

            for (let k = i; k <= j; k++) {
                arr[k].color = 'white';
            }

            await this.sleep();
        }
    };

    Update = async array => {
        if (this.state.currentlySorting) {
            this.setState({
                stripsArray: array
            });
            await this.sleep();
        }
    };

    Continue = () => this.state.currentlySorting;

    runSort = async (array, swapMethod, checkContinue, Update) => {
        await this.setState({
            currentlySorting: true
        });
        this.state.sortingAlgorithm.method(
            array,
            swapMethod,
            checkContinue,
            Update
        );
    };

    stopSort = () => {
        this.setState({
            currentlySorting: false,
            stripsArray: this.generateStripsArray(
                this.state.arraySize,
                this.state.arrayType,
                this.surfaceHeight
            )
        });
    };

    handleArraySizeSelector = arraySize => {
        this.setState({
            arraySize: arraySize,
            currentlySorting: false,
            stripsArray: this.generateStripsArray(
                arraySize,
                this.state.arrayType,
                this.surfaceHeight
            )
        });
    };

    handleAlgorithmSelector = algorithm => {
        this.setState({
            sortingAlgorithm: algorithm,
            currentlySorting: false
        });
    };

    handleArrayTypeSelector = arrayType => {
        this.setState({
            arrayType: arrayType,
            currentlySorting: false,
            stripsArray: this.generateStripsArray(
                this.state.arraySize,
                arrayType,
                this.surfaceHeight
            )
        });
    };

    TopBar = () => {
        return (
            <span className="grid-container">
                <ArraySizeSelector
                    className="ArraySizeSelector"
                    min={10}
                    max={700}
                    step={5}
                    defaultValue={this.state.arraySize}
                    onChangeHandler={this.handleArraySizeSelector}
                />

                <span className="grid-row">
                    <AlgorithmSelector
                        className="AlgorithmSelector"
                        onChangeHandler={this.handleAlgorithmSelector}
                    />

                    {this.state.currentlySorting ? (
                        <button
                            className="sortControl"
                            onClick={() => this.stopSort()}
                        >
                            Stop Sorting
                        </button>
                    ) : (
                        <button
                            className="sortControl"
                            onClick={() =>
                                this.runSort(
                                    this.state.stripsArray,
                                    this.Swap,
                                    this.Continue,
                                    this.Update
                                )
                            }
                        >
                            Start Sorting
                        </button>
                    )}

                    <ArrayTypeSelector
                        className="ArrayTypeSelector"
                        onChangeHandler={this.handleArrayTypeSelector}
                    />
                </span>
            </span>
        );
    };

    Strips = () => {
        return this.state.stripsArray.map(strip => {
            const stripStyles = {
                height: `${strip.length}px`,
                backgroundColor: strip.color
            };
            return (
                <span
                    key={this.uuidv4()}
                    className="strip"
                    style={stripStyles}
                ></span>
            );
        });
    };

    surfaceStyles = {
        width: '90%',
        margin: '0.5rem auto',
        height: `${this.surfaceHeight}px`
    };

    render() {
        return (
            <div>
                <this.TopBar />
                <span
                    className="surface"
                    ref="surface"
                    style={this.surfaceStyles}
                >
                    <this.Strips />
                </span>
            </div>
        );
    }
}

export default App;
