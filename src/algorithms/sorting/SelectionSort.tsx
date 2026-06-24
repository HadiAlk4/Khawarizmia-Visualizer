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
        let liveSpeed = useSettingsStore.getState().animationSpeed;

        await sleep(liveSpeed * 0.4);

        for(let i = 0; i < currentArray.length - 1; i++){
            let minIndex = i;
            for(let j = i + 1; j < currentArray.length; j++){
                if(currentArray[j] < currentArray[minIndex]){
                    minIndex = j;
                }
            } 

            if (minIndex !== i) {
                [currentArray[i], currentArray[minIndex]] = [currentArray[minIndex], currentArray[i]];
            }
        }
    }

    return (
        <div>
            <h1>
                Selection Sort
            </h1>

            <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick = {
            () => 
            {
                SetSelectionArray(RandomGenerator());
            }
            }
            >
            Generate New Array 
            </button>

            <Link to="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"> Back Home </Link>
            <SpeedSettings />

            <div className='flex flex-row items-end justify-center h-64 gap-1 mt-10'>
                {SelectionArray.map((value, index) => 
                (
                <div className={`w-10 relative justify-center flex bg-red-500`} style={{height: `${value * 4}px`}} key={index}> 
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

