import Card from '../components/Card';


const HomeScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-8">
        <header className="flex flex-row items-center justify-center pt-20">
            <h1 className="font-kufi text-6xl font-extrabold tracking-tight text-black mb-4 text-center">
            Khawarizmia-Visualizer
            </h1>
        </header>
        
        <div className="grid grid-cols-4 gap-4" >

        <Card>

        </Card>

        </div>
       
        </div>
    );
};

export default HomeScreen;