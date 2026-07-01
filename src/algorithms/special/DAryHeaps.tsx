import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ReactFlow, Background, Controls, Position } from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";


const DAryHeaps = () => 
{
    const [dValue, setDValue] = useState<number>(3);
    const [heapArray, setHeapArray] = useState<number[]> ([45, 20, 14, 12, 31, 7, 11, 2]);
    const [newValue, setNewValue] = useState<string>("");

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const getParentIndex = (index: number) => 
    {
        if(index === 0) return null;
        return Math.floor((index - 1) / dValue);
    };

    const handleInsert = () => 
    {
        if (heapArray.length >= 14) return;

        if(!newValue) return;
        const val = parseInt(newValue);
        if(isNaN(val)) return;

        const newHeap = [...heapArray, val];
        let currIdx = newHeap.length - 1;
        let parentIdx = Math.floor((currIdx - 1) / dValue);

        while (currIdx > 0 && newHeap[currIdx] > newHeap[parentIdx])
        {
            const temp = newHeap[currIdx];
            newHeap[currIdx] = newHeap[parentIdx];
            newHeap[parentIdx] = temp;

            currIdx = parentIdx;
            parentIdx = Math.floor((currIdx - 1) / dValue);
        }

        setHeapArray(newHeap);
        setNewValue("");

    }

    useEffect(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        const xPosition: Record<number, number> = {};

        heapArray.forEach((value, index) => {
            let depth = 0;
            let curr = index;
            while (curr > 0){
                curr = Math.floor((curr - 1) / dValue);
                depth++;
            }

            let xPos = 0;
            if(index === 0)
            {
                xPos = 0;
            }  else 
            {
                const parentIdx = Math.floor((index - 1) / dValue);
                const parentX = xPosition[parentIdx] || 0;

                const childPosition = (index - 1) % dValue;

                const centerOffset = (dValue - 1) / 2;
                const shift = childPosition - centerOffset;

                const spacing = 400 / Math.pow(dValue, depth - 1);

                xPos = parentX + (shift * spacing);
            }

            xPosition[index] = xPos;

            newNodes.push({ 
                id: index.toString(),
                position: { x: xPos, y: depth * 120},
                data: {label: value.toString() },

                style: {
                    background: '#94ce4e',
                    border: '2px solid black',
                    fontWeight: 'bold',
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                    borderRadius: 0,
                    width: 50,
                    display: 'flex',
                    justifyContent: 'center'
                }
            });

            if(index > 0){
                const parentIdx = getParentIndex(index);
                newEdges.push({
                    id: `e${parentIdx}-${index}`,
                    source: parentIdx?.toString() || "0",
                    target: index.toString(),
                    type: 'straight',
                    style: {stroke: 'black', strokeWidth: 3}
                });
            }
        });

        setNodes(newNodes);
        setEdges(newEdges);
    }, [heapArray, dValue]);

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

        <div className="w-full max-w-5xl grid grid-cols-1 gap-8 mt-4">
            <div className="w-full h-[400px] bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">   
            <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            >
                <Background color="#ccc" gap={16} />
                <Controls />
            </ReactFlow>
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