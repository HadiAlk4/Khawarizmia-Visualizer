import {useState} from 'react';

import RandomGenerator from '../../utilities/RandomGenerator';


const BubbleSort = () => {

    const [array, setArray] = useState(RandomGenerator)
    return (
        <div>
            <h1> Bubble Sort </h1>
        </div>
    )
}

export default BubbleSort;