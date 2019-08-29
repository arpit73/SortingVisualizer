array = [1, 2, 1, 5, 6, 322, 4, 5, -9, -56, -1, 2, 24, 4, 5, 6];
array_sorted = array.sort((a, b) => {
    return a - b;
});

// bubbleSort = array => {
//     let size = array.length;
//     for (let i = 0; i < size; i++) {
//         for (let j = i + 1; j < size; j++) {
//             if (array[i] > array[j]) {
//                 let temp = array[j];
//                 array[j] = array[i];
//                 array[i] = temp;
//             }
//         }
//     }
//     return array;
// };

function bubbleSort(arr) {
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (arr[j - 1] > arr[j]) {
                let temp = arr[j - 1];
                arr[j - 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

console.log(array_sorted == bubbleSort(array));
