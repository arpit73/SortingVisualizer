array = [
    -99,
    1,
    2,
    -2,
    -9,
    1,
    -1,
    5,
    6,
    -999,
    999,
    322,
    4,
    5,
    -9,
    -56,
    2,
    24,
    4,
    0,
    5,
    6
];
array_second = [
    -99,
    1,
    2,
    -2,
    -9,
    1,
    5,
    6,
    -999,
    999,
    322,
    4,
    5,
    -9,
    -56,
    -1,
    2,
    24,
    4,
    0,
    5,
    6
];

array_sorted = array_second.sort((a, b) => {
    return a - b;
});

const swap = (arr, left, right) => {
    [arr[left], arr[right]] = [arr[right], arr[left]];
};

const partition = (arr, left, right, swap) => {
    let pivotIndex = Math.floor((right + left) / 2);
    let pivot = arr[pivotIndex];

    while (left <= right) {
        while (arr[left] < pivot) {
            left += 1;
        }
        while (arr[right] > pivot) {
            right -= 1;
        }

        if (left <= right) {
            swap(arr, left, right);

            left += 1;
            right -= 1;
        }
    }

    return left;
};

const quickSort = (arr, left, right, swap) => {
    let pivot = partition(arr, left, right, swap);

    if (left < pivot - 1) {
        quickSort(arr, left, pivot - 1, swap);
    }
    if (right > pivot) {
        quickSort(arr, pivot, right, swap);
    }
};

// console.log(array);
quickSort(array, 0, array.length - 1, swap);
let is_same = array_sorted.every((element, index) => element === array[index]);
console.log(is_same);

console.table(array_sorted);
console.table(array);
