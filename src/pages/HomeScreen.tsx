import { Link } from 'react-router-dom';

import Card from '../components/Card';


const HomeScreen = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-slate-50 p-6 bg-[url('/topography.svg')]">
            <img src="/floral-border.jpg" className="absolute top-0 left-0 w-64  mix-blend-multiply scale-x-[-1] pointer-events-none" alt="" />
            <img src="/floral-border.jpg" className="absolute top-0 right-0 w-64  mix-blend-multiply scale-x-[1] pointer-events-none" alt="" />
            <img src="/floral-border.jpg" className="absolute bottom-0 left-0 w-64  mix-blend-multiply scale-x-[-1] scale-y-[-1] pointer-events-none" alt="" />
            <img src="/floral-border.jpg" className="absolute bottom-0 right-0 w-64  mix-blend-multiply scale-x-[1] scale-y-[-1] pointer-events-none" alt="" />
            <header className="items-center justify-center pt-10 pb-20">
                <h1 className="font-kufi text-6xl font-extrabold tracking-tight text-black text-center">
                    Khawarizmia-Visualizer
                </h1>
            </header>

            <div className="grid grid-cols-4 gap-4" >
                <Card footer = {
                    <div className="flex flex-row gap-4 justify-center"> 
                    <Link to="/sorting/BubbleSort" className="text-blue-500 hover:underline text-[20px]"> Bubble Sort </Link> 
                    <Link to="/sorting/SelectionSort" className="text-blue-500 hover:underline text-[20px]"> Selection Sort </Link> 
                    </div>
                    } >
                    <div className="flex items-center gap-2 flex-col">
                    <img src="/octopus-floating.gif" className="w-86 h-26"/>
                    <h1 className="font-kufi font-extrabold tracking-tight text-black text-center text-lg"> Sorting Algorithms </h1>

                    </div>

                </Card> 

                <Card />

                <Card footer={<p >not default</p>}>
                    <h2 > make the the header Selection sort itself on start up </h2>
                </Card>

                <Card />
            </div>

        </div>
    );
};

export default HomeScreen;