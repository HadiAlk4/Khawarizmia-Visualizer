import useSettingsStore from '../store/useSettingsStore';
import React from 'react';


const speedSettings = () => {
    const { animationSpeed, setAnimationSpeed } = useSettingsStore();

    return (
        <div className="flex flex-col items-center mt-4">
            <label className="text-sm font-bold text-gray-700 mb-2">
                Animation Speed: {animationSpeed} ms
            </label>

            <input
                type="range"
                min="100"
                max="1000"
                step="10"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                className="w-64 cursor-pointer"
            />
        </div>
    );
};

export default speedSettings;