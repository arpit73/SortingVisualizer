class Algorithm {
    constructor(name, method) {
        this.name = name;
        this.method = method;
    }
}

const BubbleSort = new Algorithm('Bubble Sort', async (arr, swap) => {
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            let backup_1 = arr[j - 1].color;
            let backup_2 = arr[j].color;

            arr[j - 1].color = 'red';
            arr[j].color = 'red';

            if (arr[j - 1].length > arr[j].length) {
                await swap(arr, j - 1, j);
            }

            arr[j - 1].color = backup_1;
            arr[j].color = backup_2;
        }
    }
});

const QuickSort = new Algorithm('Quick Sort', async (arr, swap) => {
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            let backup_1 = arr[j - 1].color;
            let backup_2 = arr[j].color;

            arr[j - 1].color = 'red';
            arr[j].color = 'red';

            if (arr[j - 1].length > arr[j].length) {
                await swap(arr, j - 1, j);
            }

            arr[j - 1].color = backup_1;
            arr[j].color = backup_2;
        }
    }
});

const SortingAlgorithms = [BubbleSort, QuickSort];

export default SortingAlgorithms;
