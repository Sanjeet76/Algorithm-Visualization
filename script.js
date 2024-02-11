
const data = [];
let datasize = 20;
let animationspeed = 100;

const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

for (let i = 0; i < datasize; i++) {
    data.push(Math.floor(Math.random() * 100));
}

function drawgraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width - 40) / (2 * data.length - 1);
    const barHeightUnit = (canvas.height - 50) / Math.max(...data);
    data.forEach((value, index) => {

        ctx.fillStyle = 'blue';
        ctx.fillRect((index * 2) * barWidth + 20, canvas.height - value * barHeightUnit, barWidth, value * barHeightUnit);

        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.font = '12px Arial';

        const labelX = (index * 2) * barWidth + 20 + barWidth / 2;
        const labelY = canvas.height - value * barHeightUnit - 5;

        ctx.fillText(value, labelX, labelY);
    });
}

function randomizeData() {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
    drawgraph();
}

function insertionSort(data) {
    for (let i = 1; i < data.length; i++) {
        let current = data[i];
        let j = i - 1;
        while (j >= 0 && data[j] > current) {
            data[j + 1] = data[j];
            j--;
        }
        data[j + 1] = current;
    }
    return data;
}

function selectionSort(data) {
    for (let i = 0; i < data.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < data.length; j++) {
            if (data[j] < data[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [data[i], data[minIndex]] = [data[minIndex], data[i]];
        }
    }
    return data;
}

function bubbleSort(data) {
    const n = data.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
            }
        }
    }
    return data;
}

function quickSort(data) {
    if (data.length <= 1) {
        return data;
    }

    const pivot = data[data.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < data.length - 1; i++) {
        if (data[i] < pivot) {
            left.push(data[i]);
        } else {
            right.push(data[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(data) {
    if (data.length <= 1) {
        return data;
    }

    const mid = Math.floor(data.length / 2);
    const left = data.slice(0, mid);
    const right = data.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function shellSort(data) {
    const n = data.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i += 1) {
            const temp = data[i];
            let j;
            for (j = i; j >= gap && data[j - gap] > temp; j -= gap) {
                data[j] = data[j - gap];
            }
            data[j] = temp;
        }
    }
    return data;
}

function animateSorting(sortedData, sortingFunction) {
    let steps = [];
    for (let i = 1; i < sortedData.length; i++) {
        let tempData = sortedData.slice(0, i + 1);
        steps.push(tempData);
    }

    let stepIndex = 0;

    function animateStep() {
        if (stepIndex >= steps.length) return;
        data.splice(0, steps[stepIndex].length, ...steps[stepIndex]);
        drawgraph();
        stepIndex++;
        setTimeout(animateStep, animationspeed);
    }

    animateStep();
}

document.getElementById('randomize').addEventListener('click', randomizeData);

document.getElementById('insertion-sort').addEventListener('click', () => {
    const sortedData = insertionSort(data.slice());
    animateSorting(sortedData, insertionSort);
});

document.getElementById('selection-sort').addEventListener('click', () => {
    const sortedData = selectionSort(data.slice());
    animateSorting(sortedData, selectionSort);
});

document.getElementById('bubble-sort').addEventListener('click', () => {
    const sortedData = bubbleSort(data.slice());
    animateSorting(sortedData, bubbleSort);
});

document.getElementById('quick-sort').addEventListener('click', () => {
    const sortedData = quickSort(data.slice());
    animateSorting(sortedData, quickSort);
});

document.getElementById('merge-sort').addEventListener('click', () => {
    const sortedData = mergeSort(data.slice());
    animateSorting(sortedData, mergeSort);
});

document.getElementById('shell-sort').addEventListener('click', () => {
    const sortedData = shellSort(data.slice());
    animateSorting(sortedData, shellSort);
});

document.getElementById('change-size').addEventListener('click', () => {
    datasize = parseInt(prompt("Enter new data size:"));
    data.length = 0;
    for (let i = 0; i < datasize; i++) {
        data.push(Math.floor(Math.random() * 100));
    }
    drawgraph();
});
document.getElementById('animation-speed').addEventListener('click', () => {
    animationspeed = parseInt(prompt("Enter new animation speed (in milliseconds):"));
});


drawgraph();
