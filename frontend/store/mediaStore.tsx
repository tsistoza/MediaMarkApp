import { create } from "zustand";

interface MediaStore {
    currentMedia: string;
    setCurrentMedia: (media: string) => void;
};

export const useMediaStore = create<MediaStore>((set, get) => ({
    currentMedia: "novels",
    setCurrentMedia: (media) => set({ currentMedia: media }),
}));
