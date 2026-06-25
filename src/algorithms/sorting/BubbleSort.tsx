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
        <div className="relative overflow-hidden min-h-screen bg-slate-50 p-0 bg-[url('/overlapping-circles.svg')]">

            <div className="flex  bg-black relative items-center justify-center">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
            <SpeedSettings />
            </div>
            <h1 className="font-kufi text-6xl font-extrabold tracking-tight text-white bg-black text-center w-full py-2"> Bubble Sort </h1>
            </div>
            <div className="flex-col flex items-start gap-4 p-4 bg-black w-max  shadow-lg mt-0 font-kufi">
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
                
            className={`px-4 py-2 text-white rounded px-18.5 ${isSorting || sortedIndices.length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                Sort
            </button>

            <Link to="/" className="px-4 py-2 bg-gray-500 px-12 text-white rounded hover:bg-gray-600 text-center">
                Back Home
            </Link>    
            </div>


            <div className="flex flex-row items-end justify-center h-64 gap-1 -mt-10">

                {bubbleArray.map((value, index) => (
                    <div className={`w-20 relative  justify-center flex ${getBarColor(index, compareIndices, swapIndices, sortedIndices)}`} style={{ height: `${value * 4}px` }} key={index}>
                        <span className={`font-bold text-yellow-500 text-center ${value <= 6 ? 'absolute -top-6' : 'pt-1'}`}>
                            {value}
                        </span>
                        <span className="text-center absolute -bottom-6 text-white text-sm bg-black w-full py-0.5">
                            {index}
                        </span>
                    </div>

                ))}

            </div>
        </div>
    )
}

export default BubbleSort;