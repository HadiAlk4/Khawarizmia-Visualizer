import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// --- INTERFACES ---
interface TreeNode {
    id: string;
    value: number;
    height: number;
    left: TreeNode | null;
    right: TreeNode | null;
    x: number; 
    y: number;
}

// A "Photograph" of the exact state of the algorithm at a single moment in time
interface Snapshot {
    root: TreeNode | null;
    stackVals: number[]; // Just the numbers for the UI Stack box
    activeNodeId: string | null;
    message: string;
}

const AvlDebugger = () => {
    // --- STATE ---
    const [committedRoot, setCommittedRoot] = useState<TreeNode | null>(null);
    const [newValue, setNewValue] = useState<string>("");
    
    // Time Travel State
    const [sequence, setSequence] = useState<Snapshot[]>([]);
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);

    // React Flow State
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    // --- UTILS & MATH ---
    const getHeight = (node: TreeNode | null) => node ? node.height : 0;
    const getBalance = (node: TreeNode | null) => node ? getHeight(node.left) - getHeight(node.right) : 0;
    const updateHeight = (node: TreeNode) => { node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right)); };

    // Deep clones the tree so our history snapshots don't accidentally mutate each other
    const cloneTree = (node: TreeNode | null): TreeNode | null => {
        if (!node) return null;
        return { ...node, left: cloneTree(node.left), right: cloneTree(node.right) };
    };

    // Re-calculates perfect X/Y coordinates for the entire tree
    const applyLayout = (rootNode: TreeNode | null) => {
        if (!rootNode) return;
        const queue: { node: TreeNode, depth: number, x: number }[] = [{ node: rootNode, depth: 0, x: 0 }];
        while (queue.length > 0) {
            const { node, depth, x } = queue.shift()!;
            node.x = x;
            node.y = depth * 100;
            const offset = Math.max(60, 250 / Math.pow(1.5, depth));
            if (node.left) queue.push({ node: node.left, depth: depth + 1, x: x - offset });
            if (node.right) queue.push({ node: node.right, depth: depth + 1, x: x + offset });
        }
    };

    // --- THE SNAPSHOT ENGINE ---
    const handleStartSimulation = () => {
        const val = parseInt(newValue);
        if (isNaN(val)) return;

        const snaps: Snapshot[] = [];
        let virtualRoot = cloneTree(committedRoot);
        const stack: TreeNode[] = [];
        const stackVals: number[] = [];

        // Helper to take a picture of the current state
        const takeSnapshot = (msg: string, activeId: string | null) => {
            applyLayout(virtualRoot);
            snaps.push({ root: cloneTree(virtualRoot), stackVals: [...stackVals], activeNodeId: activeId, message: msg });
        };

        const newNode: TreeNode = { id: Date.now().toString(), value: val, height: 1, left: null, right: null, x: 0, y: 0 };

        if (!virtualRoot) {
            virtualRoot = newNode;
            takeSnapshot(`Tree is empty. Inserting ${val} as Root.`, newNode.id);
            finishSimulation(snaps, virtualRoot);
            return;
        }

        // 1. THE DESCENT
        let curr: TreeNode | null = virtualRoot;
        while (curr) {
            stack.push(curr);
            stackVals.push(curr.value);
            takeSnapshot(`Target ${val} vs Node ${curr.value}. Pushing ${curr.value} to Stack.`, curr.id);
            
            if (val < curr.value) {
                if (!curr.left) { 
                    curr.left = newNode; 
                    takeSnapshot(`Found empty left pointer. Inserting ${val}.`, newNode.id);
                    break; 
                }
                takeSnapshot(`Moving Left.`, curr.left.id);
                curr = curr.left;
            } else if (val > curr.value) {
                if (!curr.right) { 
                    curr.right = newNode; 
                    takeSnapshot(`Found empty right pointer. Inserting ${val}.`, newNode.id);
                    break; 
                }
                takeSnapshot(`Moving Right.`, curr.right.id);
                curr = curr.right;
            } else {
                takeSnapshot(`Duplicate value found. Aborting.`, curr.id);
                setNewValue("");
                // 🟢 FIXED: Trigger simulation playback before returning
                finishSimulation(snaps, virtualRoot);
                return; 
            }
        }

        // 2. THE ASCENT (Unwinding)
        for (let i = stack.length - 1; i >= 0; i--) {
            const node = stack[i];
            const parent = i > 0 ? stack[i - 1] : null;
            stackVals.pop(); // Remove from UI stack

            updateHeight(node);
            const balance = getBalance(node);
            takeSnapshot(`Popped ${node.value} from Stack. Height: ${node.height}, Balance: ${balance}.`, node.id);

            let newSubtreeRoot = node;
            let rotated = false;

            if (balance > 1 && val < node.left!.value) {
                takeSnapshot(`Imbalance detected at ${node.value} (Left-Left). Performing Right Rotation.`, node.id);
                newSubtreeRoot = rotateRight(node); rotated = true;
            } else if (balance < -1 && val > node.right!.value) {
                takeSnapshot(`Imbalance detected at ${node.value} (Right-Right). Performing Left Rotation.`, node.id);
                newSubtreeRoot = rotateLeft(node); rotated = true;
            } else if (balance > 1 && val > node.left!.value) {
                takeSnapshot(`Imbalance detected at ${node.value} (Left-Right). Left Rotation on child, then Right Rotation.`, node.id);
                node.left = rotateLeft(node.left!);
                newSubtreeRoot = rotateRight(node); rotated = true;
            } else if (balance < -1 && val < node.right!.value) {
                takeSnapshot(`Imbalance detected at ${node.value} (Right-Left). Right Rotation on child, then Left Rotation.`, node.id);
                node.right = rotateRight(node.right!);
                newSubtreeRoot = rotateLeft(node); rotated = true;
            }

            if (rotated) {
                if (!parent) virtualRoot = newSubtreeRoot;
                else if (parent.left === node) parent.left = newSubtreeRoot;
                else parent.right = newSubtreeRoot;
                takeSnapshot(`Rotation complete. Subtree balanced.`, newSubtreeRoot.id);
            }
        }

        takeSnapshot(`Insertion complete. Awaiting next command.`, null);
        finishSimulation(snaps, virtualRoot);
    };

    const finishSimulation = (snaps: Snapshot[], finalRoot: TreeNode) => {
        setSequence(snaps);
        setStepIndex(0);
        setIsSimulating(true);
        setCommittedRoot(finalRoot); 
        setNewValue("");
    };

    // --- ROTATION LOGIC ---
    const rotateRight = (y: TreeNode): TreeNode => {
        const x = y.left!; const T2 = x.right;
        x.right = y; y.left = T2;
        updateHeight(y); updateHeight(x);
        return x;
    };
    const rotateLeft = (x: TreeNode): TreeNode => {
        const y = x.right!; const T2 = y.left;
        y.left = x; x.right = T2;
        updateHeight(x); updateHeight(y);
        return y;
    };

    // --- REACT FLOW RENDERER ---
    const displayFrame = isSimulating && sequence.length > 0 ? sequence[stepIndex] : { root: committedRoot, activeNodeId: null };

    useEffect(() => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        
        if (displayFrame.root) {
            const queue: TreeNode[] = [displayFrame.root];
            while (queue.length > 0) {
                const current = queue.shift()!;
                const isActive = current.id === displayFrame.activeNodeId;

                newNodes.push({
                    id: current.id,
                    position: { x: current.x, y: current.y },
                    data: { label: current.value.toString() },
                    style: {
                        background: isActive ? '#fef08a' : '#94ce4e', 
                        border: isActive ? '4px solid #ca8a04' : '2px solid black',
                        boxShadow: isActive ? '0px 0px 15px 5px rgba(202,138,4,0.6)' : '4px 4px 0px 0px rgba(0,0,0,1)', 
                        fontWeight: 'bold',
                        borderRadius: '50%',
                        width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center',
                        transition: 'all 0.3s ease' 
                    }
                });

                if (current.left) {
                    newEdges.push({ id: `e${current.id}-${current.left.id}`, source: current.id, target: current.left.id, type: 'straight', style: { stroke: 'black', strokeWidth: 3 } });
                    queue.push(current.left);
                }
                if (current.right) {
                    newEdges.push({ id: `e${current.id}-${current.right.id}`, source: current.id, target: current.right.id, type: 'straight', style: { stroke: 'black', strokeWidth: 3 } });
                    queue.push(current.right);
                }
            }
        }
        setNodes(newNodes);
        setEdges(newEdges);
    }, [displayFrame.root, displayFrame.activeNodeId]); 

    // --- UI RENDER ---
    return (
        <div className="relative min-h-screen bg-slate-50 p-8 flex flex-col items-center gap-8 font-kufi bg-[url('/overlapping-circles.svg')]">   
            <Link to="/" className="absolute top-8 left-8 px-6 py-2 bg-gray-500 text-white font-bold rounded-none hover:bg-gray-600 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors">Go Home</Link>
            <h1 className="text-4xl font-extrabold text-white bg-black px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Iterative AVL Debugger</h1>

            {/* TOP CONTROLS */}
            <div className="flex gap-4 items-center bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-4">
                <input 
                    type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)}
                    // 🟢 FIXED: The Enter key now perfectly triggers the simulation playback!
                    onKeyDown={(e) => { if (e.key === 'Enter' && !isSimulating) handleStartSimulation(); }}
                    disabled={isSimulating} placeholder="+"
                    className="p-2 border-2 border-black font-bold text-xl outline-none focus:border-[#94ce4e] w-24 text-center disabled:bg-gray-200"
                />
                {!isSimulating ? (
                    <button onClick={handleStartSimulation} className="px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-gray-800 transition-colors">Start Step-by-Step</button>
                ) : (
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setStepIndex(i => Math.max(0, i - 1))} disabled={stepIndex === 0}
                            className="px-4 py-2 bg-gray-300 text-black font-bold border-2 border-black hover:bg-gray-400 disabled:opacity-50"
                        > Prev </button>
                        <button 
                            onClick={() => {
                                if (stepIndex === sequence.length - 1) setIsSimulating(false);
                                else setStepIndex(i => i + 1);
                            }} 
                            className="px-4 py-2 bg-[#94ce4e] text-black font-bold border-2 border-black hover:bg-green-500"
                        >
                            {stepIndex === sequence.length - 1 ? "Finish" : "Next Step"}
                        </button>
                    </div>
                )}
            </div>

            {/* SPLIT PANE LAYOUT */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8 mt-4">
                
                {/* LEFT PANE: Tree Canvas */}
                <div className="lg:col-span-3 w-full h-[550px] bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">   
                    {/* Action Log Overlay */}
                    <div className="absolute top-4 left-4 z-10 bg-white border-4 border-black p-3 max-w-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Algorithm Action Log</span>
                        <p className="font-bold text-sm leading-tight text-black">
                            {isSimulating ? sequence[stepIndex]?.message : "Ready for next insertion."}
                        </p>
                    </div>

                    <ReactFlow nodes={nodes} edges={edges} fitView>
                        <Background color="#ccc" gap={16} />
                        <Controls />
                    </ReactFlow>
                </div>

                {/* RIGHT PANE: The Stack Memory */}
                <div className="lg:col-span-1 flex flex-col items-center">
                    <h2 className="text-xl font-bold bg-black text-white px-4 py-1 mb-2 w-full text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Stack Memory</h2>
                    
                    <div className="w-full h-[500px] bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex flex-col justify-end items-center gap-2 overflow-y-auto">
                        {(!isSimulating || sequence[stepIndex]?.stackVals.length === 0) && (
                            <span className="text-gray-400 font-bold mb-4">Stack is Empty</span>
                        )}

                        {isSimulating && [...sequence[stepIndex].stackVals].reverse().map((val, idx) => (
                            <div key={`${val}-${idx}`} className="w-24 h-12 flex items-center justify-center bg-gray-200 border-4 border-black font-bold text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
                                {val}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AvlDebugger;