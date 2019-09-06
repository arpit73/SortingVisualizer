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

// const partition = (arr, left, right, swap) => {
//     let pivotIndex = Math.floor((right + left) / 2);
//     let pivot = arr[pivotIndex];

//     while (left <= right) {
//         while (arr[left] < pivot) {
//             left += 1;
//         }
//         while (arr[right] > pivot) {
//             right -= 1;
//         }

//         if (left <= right) {
//             swap(arr, left, right);

//             left += 1;
//             right -= 1;
//         }
//     }

//     return left;
// };
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

const quickSort = (arr, left, right, swap) => {
    if (left < right) {
        let pivot = partition(arr, left, right, swap);

        quickSort(arr, left, pivot - 1, swap);
        quickSort(arr, pivot + 1, right, swap);
    }
};

// console.log(array);
quickSort(array, 0, array.length - 1, swap);
let is_same = array_sorted.every((element, index) => element === array[index]);
console.log(is_same);

console.table(array_sorted);
console.table(array);
