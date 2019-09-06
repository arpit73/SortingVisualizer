class Algorithm {
    constructor(name, method) {
        this.name = name;
        this.method = method;
    }
}

const BubbleSort = new Algorithm(
    'Bubble Sort',
    async (arr, Swap, Continue, Update) => {
        firstLoop: for (let i = arr.length - 1; i >= 0; i--) {
            for (let j = 1; j <= i; j++) {
                if (arr[j - 1].length > arr[j].length) {
                    if (!Continue()) {
                        break firstLoop;
                    }
                    await Swap(arr, j - 1, j);
                }
            }
        }
    }
);

const partition = async (arr, left, right, Swap) => {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j].length < pivot.length) {
            i += 1;
            await Swap(arr, i, j);
        }
    }
    await Swap(arr, i + 1, right);
    return i + 1;
};

const quickSort = async (arr, left, right, Swap, Continue) => {
    if (left < right && Continue()) {
        partition(arr, left, right, Swap).then(pivot => {
            Promise.all([
                quickSort(arr, left, pivot - 1, Swap, Continue),
                quickSort(arr, pivot + 1, right, Swap, Continue)
            ]);
        });
    }
};

const QuickSort = new Algorithm(
    'Quick Sort',
    async (arr, Swap, Continue, Update) => {
        quickSort(arr, 0, arr.length - 1, Swap, Continue);
    }
);

const mergeSort = async (array, Continue, Update) => {
    if (array.length > 1 && Continue()) {
        let mid = Math.floor(array.length / 2),
            leftHalf = array.slice(0, mid),
            rightHalf = array.slice(mid, array.length);

        Promise.all([
            mergeSort(leftHalf, Continue, Update),
            mergeSort(rightHalf, Continue, Update)
        ]);

        let i = 0,
            j = 0,
            k = 0;

        while (i < leftHalf.length && j < rightHalf.length) {
            if (leftHalf[i].length <= rightHalf[j].length) {
                array[k] = leftHalf[i];
                array[k].color = 'red';
                await Update(array);
                array[k].color = 'white';
                i += 1;
            } else {
                array[k] = rightHalf[j];
                array[k].color = 'red';
                await Update(array);
                array[k].color = 'white';

                j += 1;
            }
            k += 1;
        }

        while (i < leftHalf.length) {
            array[k] = leftHalf[i];
            array[k].color = 'red';

            await Update(array);
            array[k].color = 'white';

            i += 1;
            k += 1;
        }

        while (j < rightHalf.length) {
            array[k] = rightHalf[j];
            array[k].color = 'red';
            await Update(array);
            array[k].color = 'white';

            j += 1;
            k += 1;
        }
    }
};

const MergeSort = new Algorithm(
    'Merge Sort',
    async (array, Swap, Continue, Update) => {
        mergeSort(array, Continue, Update);
    }
);

const SortingAlgorithms = [BubbleSort, QuickSort, MergeSort];

export default SortingAlgorithms;
