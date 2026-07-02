import { Link } from 'react-router-dom';

import Card from '../components/Card';
import AnimatedTitle from '../components/AnimatedTitle';

const HomeScreen = () => {
    return (
        <div className="relative overflow-hidden min-h-screen bg-slate-50 p-6 bg-[url('/topography.svg')]">
            <img src="/floral-border.jpg" className="absolute top-0 left-0 w-64  mix-blend-multiply scale-x-[-1] pointer-events-none" alt="" />
            <img src="/floral-border.jpg" className="absolute top-0 right-0 w-64  mix-blend-multiply scale-x-[1] pointer-events-none" alt="" />
            <img src="/floral-border.jpg" className="absolute bottom-0 left-0 w-64  mix-blend-multiply scale-x-[-1] scale-y-[-1] pointer-events-none" alt="" />
            <img src="/floral-border.jpg" className="absolute bottom-0 right-0 w-64  mix-blend-multiply scale-x-[1] scale-y-[-1] pointer-events-none" alt="" />
            <header className="items-center justify-center pt-10 pb-20">
                <h1 className="font-kufi text-6xl font-extrabold tracking-tight text-black text-center">
                    <AnimatedTitle />
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
                    
                <Card footer={<p> Using Shunting Yard Algorithim (Reverse Polish Notation) </p>}>
                    <div className="flex items-center gap-2 flex-col">
                    <img src="/smShi.gif" className="w-96 h-26"/>
                    <Link to="/calculators/InfixToPostfix"  className="font-kufi font-extrabold tracking-tight text-blue-500 hover:underline text-center text-lg"> Infix to Postfix Visualizer </Link>

                    </div>

                </Card>

                <Card footer={<p >Reverse Output of Postfix (Polish Notation) </p>}>
                    <div className="flex items-center gap-2 flex-col">
                    <img src="/calc.gif" className="w-96 h-26"/>
                    <Link to="/calculators/PrefixCalc"  className="font-kufi font-extrabold tracking-tight text-blue-500 hover:underline text-center text-lg"> Infix to Prefix Visualizer </Link>
                    </div>           
                </Card>

                <Card footer={<p >Binary Heap but instead of having at most two children it has at most `d` children. </p>}>
                    <div className="flex items-center gap-2 flex-col">
                    <img src="/bigK.gif" className="w-96 h-26"/>
                    <Link to="/special/DAryHeaps"  className="font-kufi font-extrabold tracking-tight text-blue-500 hover:underline text-center text-lg"> D-Ary Heaps </Link>
                    </div>                  
                </Card>
                <Card footer={<p> AVL tree balanced without recusrion</p>}>
                    <Link to="/special/AvlNoRecursion"  className="font-kufi font-extrabold tracking-tight text-blue-500 hover:underline text-center text-lg"> Stack AVL </Link>
                </Card>
            </div>

        </div>
    );
};

export default HomeScreen;