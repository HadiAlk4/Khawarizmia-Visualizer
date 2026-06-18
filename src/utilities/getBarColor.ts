
const getBarColor = (index, compareIndices, swapIndices, sortedIndices) => {
    if(sortedIndices.includes(index)) {
        return 'bg-blue-500';
    } else if(swapIndices.includes(index)) {
        return 'bg-green-500';
    } else if (compareIndices.includes(index)) {
        return 'bg-yellow-500';
    } else {
        return 'bg-red-500';
    }
}

export default getBarColor;