import { Link } from 'react-router-dom';

import Card from '../components/Card';


const HomeScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <header className="items-center justify-center pt-10 pb-15">
                <h1 className="font-kufi text-6xl font-extrabold tracking-tight text-black text-center">
                    Khawarizmia-Visualizer
                </h1>
            </header>

            <div className="grid grid-cols-4 gap-4" >
                <Card footer = {
                    <div className="flex flex-row gap-4"> 
                    <Link to="/sorting/BubbleSort" className="text-blue-500 hover:underline"> Bubble Sort </Link> 
                    <Link to="/sorting/SelectionSort" className="text-blue-500 hover:underline"> Selection Sort </Link> 
                    </div>
                    } >
                    <h1> Sorting </h1>

                </Card> 

                <Card />

                <Card footer={<p >not default</p>}>
                    <h2 >not default</h2>
                </Card>

                <Card />
            </div>

        </div>
    );
};

export default HomeScreen;