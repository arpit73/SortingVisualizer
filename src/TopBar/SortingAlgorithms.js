class Algorithm {
    constructor(name, method) {
        this.name = name;
        this.method = method;
    }
}

const BubbleSort = new Algorithm('Bubble Sort', async (arr, swap) => {
    firstLoop: for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (arr[j - 1].length > arr[j].length) {
                if (!(await swap(arr, j - 1, j))) {
                    break firstLoop;
                }
            }
        }
    }
});

const partition = async (arr, left, right, swap) => {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j].length < pivot.length) {
            i += 1;
            await swap(arr, i, j);
        }
    }
    await swap(arr, i + 1, right);
    return i + 1;
};

const quickSort = async (arr, left, right, swap) => {
    if (left < right) {
        partition(arr, left, right, swap).then(pivot => {
            Promise.all([
                quickSort(arr, left, pivot - 1, swap),
                quickSort(arr, pivot + 1, right, swap)
            ]);
        });
    }
};

const QuickSort = new Algorithm('Quick Sort', async (arr, swap) => {
    quickSort(arr, 0, arr.length - 1, swap);
});

const SortingAlgorithms = [BubbleSort, QuickSort];

export default SortingAlgorithms;
