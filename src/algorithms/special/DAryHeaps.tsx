import React, { useState } from "react";
import { Link } from 'react-router-dom';

const DAryHeaps = () => 
{
    const [dValue, setDValue] = useState<number>(3);
    const [heapArray, setHeapArray] = useState<number[]> ([45, 20, 14, 12, 31, 7, 11, 2]);

    const getParentIndex = (index: number) => 
    {
        if(index === 0) return null;
        return Math.floor((index - 1) / dValue);
    };

    const getChildrenIndices = (index: number) => 
    {
        const children = [];
        for ( let k = 1; k <= dValue; k++)
        {
            const childIndex = (dValue * index) + k;
            if(childIndex < heapArray.length)
            {
                children.push(childIndex);
            }
        }
        return children;
    } 

    return (
        <div className="relative min-h-screen bg-slate-50 p-8 flex flex-col items-center gap-8 font-kufi">   
        <Link to="/" className="absolute top-8 left-8 px-6 py-2 bg-gray-500 text-white font-bold rounded-none hover:bg-gray-600 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors">
        Go Home 
        </Link>

        <h1 className="text-4xl font-extrabold text-white bg-black px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">            
        D-Ary Heap Visualizer
        </h1>

        <div className="flex gap-4 items-center hg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4">
            <div className="flex flex-col items-center">
                <label className="font-bold mb-1"> Set 'd' Value </label>
                <input 
                type="number"
                min="2"
                max="5"
                value={dValue}
                onChange={(e) => setDValue(parseInt(e.target.value) || 2)}
                className="p-2 border-2 border-black font-bold text-xl outline-none focus:border-[#94ce4e] w-24 text-center"
                />
            </div>

        </div>
        <div className="w-full max-w-4xl flex flex-col items-center gap-2 mt-4">
            <h2 className="text-xl font-bold bg-black text-white px-4 py-1"> Underlaying Array Memory </h2>
        <div className="flex gap-2 p-4 bg-white border-4 border-black w-full min-h-[88px] overflow-x-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] justify-start">            
        {heapArray.map((val, idx) => (
            <div key ={idx} className="flex flex-col items-center gap-1">
            
            <div className="min-w-[50px] h-12 flex items-center justify-center bg-gray-200 border-2 border-black font-bold text-xl px-2">
            {val}
            </div>
            </div>

        ))}
        </div>

        </div>
        </div>
    );
};

export default DAryHeaps;