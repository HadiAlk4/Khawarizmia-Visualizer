// src/components/AnimatedTitle.tsx
import { useState, useEffect } from 'react';
import sleep from '../utilities/sleep';

const TARGET_STRING = "Khawarizmia-Visualizer";

// Helper function to create a scrambled array with stable IDs
const generateScrambledArray = () => {
    const arr = TARGET_STRING.split('').map((char, index) => ({ 
        id: index, // Stable React key so animations don't glitch during swaps
        char: char, 
        targetIndex: index // This is the "value" we are sorting by
    }));
    
    // Fisher-Yates Shuffle to scramble the letters
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const AnimatedTitle = () => {
    const [charArray, setCharArray] = useState(generateScrambledArray());
    const [compareIndices, setCompareIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);

    useEffect(() => {
        let isMounted = true;

        const runSelectionSort = async () => {
            await sleep(400); // Brief pause before animation starts
            
            let arr = [...charArray];
            let sorted = [];

            for (let i = 0; i < arr.length; i++) {
                let minIdx = i;
                
                // Scanning for the next correct letter
                for (let j = i + 1; j < arr.length; j++) {
                    if (!isMounted) return; // Prevent memory leaks if user navigates away
                    
                    setCompareIndices([minIdx, j]);
                    await sleep(20); // Fast scan speed (20ms)

                    // We sort based on where the letter belongs in the final string
                    if (arr[j].targetIndex < arr[minIdx].targetIndex) {
                        minIdx = j;
                    }
                }
                
                // Swap the found letter into its correct sorted position
                if (minIdx !== i) {
                    let temp = arr[i];
                    arr[i] = arr[minIdx];
                    arr[minIdx] = temp;
                    if (isMounted) setCharArray([...arr]);
                    await sleep(60); // Brief pause to show the swap
                }
                
                // Lock the letter in place
                sorted.push(i);
                if (isMounted) {
                    setSortedIndices([...sorted]);
                    setCompareIndices([]);
                }
            }
        };

        runSelectionSort();

        // Cleanup function
        return () => { isMounted = false; };
    }, []); // Empty dependency array ensures this runs exactly once on mount

    return (
        <h1 className="font-kufi text-6xl font-extrabold tracking-tight text-center flex justify-center flex-wrap">
            {charArray.map((item, index) => {
                const isComparing = compareIndices.includes(index);
                const isSorted = sortedIndices.includes(index);

                // Default unsorted state is translucent black so the sorted ones "pop"
                let styleClass = "text-black/30"; 

                if (isComparing) {
                    // Comparison state: White text on a Black block
                    styleClass = "bg-black text-white px-[2px] rounded-sm";
                } else if (isSorted) {
                    // Sorted state: Locked to solid Black
                    styleClass = "text-black";
                }

                return (
                    <span 
                        key={item.id} 
                        className={`transition-colors duration-75 inline-block ${styleClass}`}
                        style={{ minWidth: item.char === ' ' ? '1rem' : 'auto' }}
                    >
                        {item.char}
                    </span>
                );
            })}
        </h1>
    );
};

export default AnimatedTitle;