import { useState } from 'react';

import RandomGenerator from '../../utilities/RandomGenerator';
import sleep from '../../utilities/sleep';
import getBarColor from '../../utilities/getBarColor';
import { Link } from 'react-router-dom';
import useSettingsStore from '../../store/useSettingsStore';
import SpeedSettings from '../../utilities/SpeedSettings';

const BubbleSort = () => {
    const { animationSpeed } = useSettingsStore();
    const [bubbleArray, setBubbleArray] = useState<number[]>(RandomGenerator); // run only when it first reloads 
    const [compareIndices, setCompareIndices] = useState<number[]>([]);
    const [swapIndices, setSwapIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState<boolean>(false);

    const handleBubbleSort = async () => {

        if (isSorting) return;
        setIsSorting(true);
        
        let currentArray = [...bubbleArray];
        let liveSpeed = useSettingsStore.getState().animationSpeed;
        await sleep(liveSpeed * 0.4);

        for (let i = 0; i < currentArray.length - 1; i++) {
            for (let j = 0; j < currentArray.length - i - 1; j++) {

                setCompareIndices([j, j + 1]);
                    liveSpeed = useSettingsStore.getState().animationSpeed;
                    await sleep(liveSpeed * 0.4);

                if (currentArray[j] > currentArray[j + 1]) {
                    setSwapIndices([j, j + 1]);
                    await sleep(liveSpeed * 0.4);
                let tempArray = currentArray[j];
                currentArray[j] = currentArray[j + 1];
                currentArray[j + 1] = tempArray;
                    setBubbleArray([...currentArray]);
                    liveSpeed = useSettingsStore.getState().animationSpeed;
                    await sleep(liveSpeed);
                }

                setCompareIndices([]);
                setSwapIndices([]);
            }
            let lockedIndex = currentArray.length - 1 - i;
            setSortedIndices((prev) => [...prev, lockedIndex]);
        }
        setSortedIndices((prev) => [...prev, 0]);
        setIsSorting(false);
    }

    return (
        <div>
            <h1> Bubble Sort </h1>

            <button onClick={() => {
                setBubbleArray(RandomGenerator())
                setCompareIndices([]); 
                setSwapIndices([]);
                setSortedIndices([]);
            }


            } disabled={isSorting} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Generate New Array
            </button>

            <button onClick={handleBubbleSort} disabled={isSorting  || sortedIndices.length > 0}
                
            className={`px-4 py-2 text-white rounded ${isSorting || sortedIndices.length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                Sort
            </button>

            <Link to="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Back Home
            </Link>    
            <SpeedSettings />

            <div className="flex flex-row items-end justify-center h-64 gap-1 mt-10">

                {bubbleArray.map((value, index) => (
                    <div className={`w-10 relative  justify-center flex ${getBarColor(index, compareIndices, swapIndices, sortedIndices)}`} style={{ height: `${value * 4}px` }} key={index}>
                        <span className={`font-bold text-black text-center ${value <= 6 ? 'absolute -top-6' : 'pt-1'}`}>
                            {value}
                        </span>
                        <span className="text-center absolute -bottom-6 text-gray-500 text-sm">
                            {index}
                        </span>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default BubbleSort;