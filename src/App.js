import React from 'react';
import './App.css';

class Strip {
    constructor(length, color) {
        this.length = length;
        this.color = color;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arraySize: 100,
            stripsArray: []
        };
    }
    surfaceHeight = 500; // px

    componentDidMount = () => {
        this.setState({
            stripsArray: this.getInitialStrips()
        });
    };

    // componentDidUpdate = () => {};

    getRandomColor = () => {
        let red = Math.ceil(Math.random() * 250);
        let green = Math.ceil(Math.random() * 250);
        let blue = Math.ceil(Math.random() * 250);
        return `rgb(${red}, ${green}, ${blue})`;
    };

    getInitialStrips = () => {
        let lengthArray = Array.from({ length: this.state.arraySize }, () =>
            Math.ceil(Math.random() * this.surfaceHeight)
        );
        console.log(lengthArray);
        // eslint-disable-next-line
        let strips = lengthArray.map(length => {
            return new Strip(length, 'rgb(25, 125, 51)');
        });
        return strips;
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    bubbleSort = async arr => {
        let len = arr.length;
        for (let i = len - 1; i >= 0; i--) {
            for (let j = 1; j <= i; j++) {
                if (arr[j - 1].length > arr[j].length) {
                    arr[j - 1].color = 'rgb(2, 12, 51)';
                    arr[j].color = 'rgb(225, 125, 51)';
                    let temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;

                    this.setState({
                        stripsArray: arr
                    });
                    await this.sleep(10);
                }
                arr[j - 1].color = 'rgb(25, 125, 51)';
                arr[j].color = 'rgb(25, 125, 51)';
            }
        }
    };

    Strips = () => {
        return this.state.stripsArray.map(strip => {
            const stripStyles = {
                height: `${strip.length}px`,
                backgroundColor: strip.color
            };
            return <span className="strip" style={stripStyles}></span>;
        });
    };

    render() {
        const surfaceStyles = {
            width: '80%',
            height: `${this.surfaceHeight}px`,
            backgroundColor: 'white'
        };
        return (
            <div>
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
