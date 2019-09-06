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

const mergeSort = array => {
    if (array.length > 1) {
        let mid = Math.floor(array.length / 2),
            leftHalf = array.slice(0, mid),
            rightHalf = array.slice(mid, array.length);

        mergeSort(leftHalf);
        mergeSort(rightHalf);

        let i = 0,
            j = 0,
            k = 0;

        while (i < leftHalf.length && j < rightHalf.length) {
            if (leftHalf[i] <= rightHalf[j]) {
                array[k] = leftHalf[i];
                i += 1;
            } else {
                array[k] = rightHalf[j];
                j += 1;
            }
            k += 1;
        }

        while (i < leftHalf.length) {
            array[k] = leftHalf[i];
            i += 1;
            k += 1;
        }

        while (j < rightHalf.length) {
            array[k] = rightHalf[j];
            j += 1;
            k += 1;
        }
    }
};
const selectionSort = array => {
    for (var i = 0; i < array.length; i++) {
        //set min to the current iteration of i
        var min = i;
        for (var j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        swap(array, i, min);
    }
};

// console.log(array);
// quickSort(array, 0, array.length - 1, swap);
mergeSort(array);
let is_same = array_sorted.every((element, index) => element === array[index]);
console.log(is_same);

console.table(array_sorted);
console.table(array);
