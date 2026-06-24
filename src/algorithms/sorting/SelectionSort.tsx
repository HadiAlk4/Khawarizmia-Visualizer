import { useState } from 'react';
import { Link }  from 'react-router-dom'
import SpeedSettings from '../../utilities/SpeedSettings';
import RandomGenerator from '../../utilities/RandomGenerator';
import getBarColor from '../../utilities/getBarColor'
import sleep from '../../utilities/sleep';
import useSettingsStore from '../../store/useSettingsStore';

const SelectionSort = () => {

    const [SelectionArray, SetSelectionArray] = useState<number[]>(RandomGenerator);
    const [compareIndices, setCompareIndices] = useState<number[]>([]);
    const [swapIndices, setSwapIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const handleSelectionSort = async () => {
        if (isSorting) return;
        setIsSorting(true);

        let currentArray = [...SelectionArray]

        for(let i = 0; i < currentArray.length - 1; i++){
            let minIndex = i;
            for(let j = i + 1; j < currentArray.length; j++){
                setCompareIndices([ j, minIndex]); // highlight j and lowest bar found
                let liveSpeed = useSettingsStore.getState().animationSpeed;
                await sleep(liveSpeed * 0.4);
                if(currentArray[j] < currentArray[minIndex]){
                    minIndex = j;
                }
            } 
            if (minIndex !== i) {
                setSwapIndices([i, minIndex]); // highlight elements swapping 
                let liveSpeed = useSettingsStore.getState().animationSpeed;
                await sleep(liveSpeed * 0.4);
                [currentArray[i], currentArray[minIndex]] = [currentArray[minIndex], currentArray[i]];

                SetSelectionArray([...currentArray]); // push state to redraw the bar heights 
                await sleep(liveSpeed);
            }

            setCompareIndices([]);
            setSwapIndices([]);
            setSortedIndices((prev) => [...prev, i]);
            
        }

        setSortedIndices((prev) => [...prev, currentArray.length - 1]);
        setIsSorting(false);
    }

    return (
        <div>
            <h1>
                Selection Sort
            </h1>

            <button 
            disabled={isSorting}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick = {
            () => 
            {
                SetSelectionArray(RandomGenerator());
                setCompareIndices([]);
                setSwapIndices([]);
                setSortedIndices([]);
            }
            }
            >
            Generate New Array 
            </button>

            <Link to="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"> Back Home </Link>

            <button 
            onClick={handleSelectionSort} 
            disabled={isSorting || sortedIndices.length > 0}
            className={`px-4 py-2 text-white rounded ${isSorting || sortedIndices.length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
            Sort 
            </button>

            <SpeedSettings />

            <div className='flex flex-row items-end justify-center h-64 gap-1 mt-10'>
                {SelectionArray.map((value, index) => 
                (
                <div className={`w-10 relative justify-center flex ${getBarColor(index, compareIndices, swapIndices, sortedIndices)}`} style={{height: `${value * 4}px`}} key={index}> 
                <span className={`font-bold text-black text-center text-grey-500 text-sm ${value <= 6 ? 'absolute -top-6' : 'pt-1'}`}>
                    {value}
                </span>
                <span className='absolute text-black text-center text-sm -bottom-6 font-bold'>
                    {index}
                </span>
                </div>
                )
                )}

            </div>
        </div>
    );
};

export default SelectionSort;

