class Algorithm {
    constructor(name, method) {
        this.name = name;
        this.method = method;
    }
}

const BubbleSort = new Algorithm('Bubble Sort', async (arr, swap) => {
    firstLoop: for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            let backup_1 = arr[j - 1].color;
            let backup_2 = arr[j].color;

            arr[j - 1].color = 'red';
            arr[j].color = 'red';

            if (arr[j - 1].length > arr[j].length) {
                if (!(await swap(arr, j - 1, j))) {
                    break firstLoop;
                }
            }

            arr[j - 1].color = backup_1;
            arr[j].color = backup_2;
        }
    }
});

const partition = async (arr, left, right, swap) => {
    let pivotIndex = Math.floor((right + left) / 2);
    let pivot = arr[pivotIndex];

    while (left <= right) {
        while (arr[left].length < pivot.length) {
            left += 1;
        }
        while (arr[right].length > pivot.length) {
            right -= 1;
        }

        if (left <= right) {
            arr[left].color = 'red';
            arr[right].color = 'red';

            await swap(arr, left, right);

            arr[left].color = 'white';
            arr[right].color = 'white';

            left += 1;
            right -= 1;
        }
    }

    return left;
};

const quickSort = async (arr, left, right, swap) => {
    let pivot = await partition(arr, left, right, swap);

    if (left < pivot - 1) {
        await quickSort(arr, left, pivot - 1, swap);
    }
    if (right > pivot) {
        await quickSort(arr, pivot, right, swap);
    }
};

const QuickSort = new Algorithm('Quick Sort', (arr, swap) => {
    quickSort(arr, 0, arr.length - 1, swap);
});

const SortingAlgorithms = [BubbleSort, QuickSort];

export default SortingAlgorithms;
