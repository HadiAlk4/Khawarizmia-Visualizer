import { create } from 'zustand';

interface SettingsState { 

    animationSpeed: number;
    setAnimationSpeed: (speed:number) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({ 
    animationSpeed: 500,
    setAnimationSpeed: (speed) => set({ animationSpeed: speed}),
}));

export default useSettingsStore;