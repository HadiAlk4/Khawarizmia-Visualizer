import {useState} from 'react';

import RandomGenerator from '../../utilities/RandomGenerator';
import sleep from '../../utilities/sleep';


const BubbleSort = () => {

    const [bubbleArray, setBubbleArray] = useState(RandomGenerator)

    return (
        <div>
            <h1> Bubble Sort </h1>

            <button onClick={() => setBubbleArray(RandomGenerator())} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Generate New Array
            </button>

            <div className="flex flex-row items-end justify-center h-64 gap-1 mt-10"> 

                {bubbleArray.map((value, index) => (
                    <div className="w-10 bg-red-500 relative justify-center flex" style={{ height: `${value * 4}px`}} key={index}> 
                    <span className={`font-bold text-black text-center ${value < 6 ? 'absolute -top-6' : 'pt-1'}`}> 
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