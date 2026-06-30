import { useState } from "react";


const InfixToPostfix = () => {

    const [rawInput, setRawInput] = useState<string>("4 * ( 1 + 2 )");

    const [inputTokens, setInputTokens] = useState<string[]>([]);

    const [currentToken, setCurrentToken] = useState<string | null>(null);

    const [stack, setStack] = useState<string[]>([]);
    const [output, setOutput] = useState<string[]>([]);

    const handleLoadInput = () => 
    {
        const tokens = rawInput.match(/\d+|\+|\-|\*|\/|\(|\)/g) || [];

        setInputTokens(tokens);

        setCurrentToken(null);
        setStack([]);
        setOutput([]);
    };

    const handleStepForward = () => 
    {
        if(currentToken !== null)
        {
            if(/\d+/.test(currentToken))
            {
                setOutput([...output, currentToken]);
            } 
            else 
            {
                setStack([...stack, currentToken]);
            }
        }

        let nextToken = null;
        if(inputTokens.length > 0)
        {
            const remainingTokens = [...inputTokens];
            nextToken = remainingTokens.shift() || null;
            setInputTokens(remainingTokens);
        }
        setCurrentToken(nextToken);
    }
    return (
        <div className="min-h-screen bg-slate-50 p-8 flex flex-col items-center gap-8 font-kufi bg-[url('/overlapping-circles.svg')]">
            <h1 className="text-4xl font-extrabold text-white bg-black px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">            
            Shunting Yard Visualizer
            </h1>

            <div className="flex gap-4 items-center bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4">
                <input
                type="text"
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                placeholder="4 + 5 * 2"
                className="p-2 border-2 border-black font-bold text-xl outline-none focus:border-[#94ce4e] w-72"
                />

                <button 
                onClick={handleLoadInput} 
                className="px-4 py-2 bg-[#94ce4e] text-black font-bold border-2 border-black hover:bg-green-400 transition-colors"
                >
                Load Input
                </button>      
            </div>

            <div className="flex gap-2 p-4 bg-white border-4 border-black w-full min-h-[88px] overflow-x-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] justify-start">
                {inputTokens.length == 0 && (<p className="text-gray-500 italic my-auto mx-auto"> Load an Expression To Begin </p>)}
                {inputTokens.map((token, idx) => (
                    <div key={idx} className="min-w-[40px] h-10 flex items-center justify-center bg-gray-200 border-2 border-black font-bold text-xl px-2">
                        {token}
                    </div>

                ))}
            </div>


            <div className="w-full max-w-4xl grid grid-cols-2 gap-12 mt-4">
                <div className="flex flex-col items-center gap-2">
                    <h2 text-xl font-bold bg-black text-white px-4 py-1> Operator Stack </h2>
                    <div className="flex flex-col-reverse justify-start items-center gap-2 p-4 bg-white border-x-4 border-b-4 border-t-0 border-black w-32 min-h-[250px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {stack.map((op, idx) => (
                            <div key={idx} className="w-12 h-12 flex items-centeer justify-center bg-[#94ce4e] text-black border-2 border-black font-bold text-2xl">
                                {op}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <h2 text-xl font-bold bg-black text-white px-4 py-1> PostFix Output </h2>
                    <div className="flex flex-wrap gap-2 p-4 bg-white border-4 border-black w-fullmin-h-[250px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] items-start content-start">
                        {output.map((token, idx) => (
                            <div key={idx} className="min-w-[40px] h-10 flex items-center justify-center bg-blue-500 text-white border-2 border-black font-bold text-xl px-2">
                            {token}
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="flex flex-col items-center mt-4 border-t-4 border-black pt-8 w-full max-w-4xl">
            <p className="font-bold text-gray-600 mb-2 uppercase tracking-widest text-sm">Evaluating Token</p>
            <div className="w-16 h-16 flex items-center justify-center bg-yellow-400 border-4 border-black font-bold text-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
            {currentToken || "?"}
            </div>
            <button
            onClick={handleStepForward}
            className="px-8 py-4 bg-black text-white font-bold text-xl hover:bg-gray-800 transition-colors border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
            >
                Step Forward 
            </button>
            </div>




        

        </div>
    );
};

export default InfixToPostfix;