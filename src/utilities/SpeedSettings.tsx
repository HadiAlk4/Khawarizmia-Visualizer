// src/utilities/SpeedSettings.tsx
import useSettingsStore from '../store/useSettingsStore';
import React from 'react';

const SpeedSettings = () => {
    const { animationSpeed, setAnimationSpeed } = useSettingsStore();

    return (
        <div className="flex flex-col items-center gap-1">
            {/* Chunky, pixel-font friendly label layout */}
            <label className="text-xs uppercase font-extrabold tracking-wider text-[#94ce4e]">
                Speed: <span className="text-white bg-black px-1.5 py-0.5 border border-white/20">{animationSpeed}ms</span>
            </label>

            <div className="relative flex items-center h-8">
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="10"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                    className="
                        w-48 appearance-none bg-transparent cursor-pointer focus:outline-none
                        
                        /* 🟢 THE TRACK: Flat, hard-edged box shadow slider track */
                        [&::-webkit-slider-runnable-track]:h-3
                        [&::-webkit-slider-runnable-track]:bg-[#111111]
                        [&::-webkit-slider-runnable-track]:border-2
                        [&::-webkit-slider-runnable-track]:border-white
                        [&::-webkit-slider-runnable-track]:shape-rendering[crispEdges]

                        /* 🟢 THE THUMB: Chunky pixel-block handle */
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:h-6
                        [&::-webkit-slider-thumb]:w-3
                        [&::-webkit-slider-thumb]:bg-[#94ce4e]
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-black
                        [&::-webkit-slider-thumb]:-mt-[8px] /* Aligns block thumb over track */
                        [&::-webkit-slider-thumb]:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
                        
                        /* Firefox Overrides for identical pixel engine rendering */
                        [&::-moz-range-track]:h-3
                        [&::-moz-range-track]:bg-[#111111]
                        [&::-moz-range-track]:border-2
                        [&::-moz-range-track]:border-white
                        
                        [&::-moz-range-thumb]:h-6
                        [&::-moz-range-thumb]:w-3
                        [&::-moz-range-thumb]:bg-[#94ce4e]
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-black
                        [&::-moz-range-thumb]:rounded-none
                    "
                />
            </div>
        </div>
    );
};

export default SpeedSettings;