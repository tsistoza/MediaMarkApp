import { create } from "zustand";
import mediaService from "../services/mediaService.ts";

interface MediaStore {
    data: {
        "Novels": Novel[];
        "Comics": Comic[];
        "Videos": Video[];
    };
    loading: {
        "Novels": boolean;
        "Comics": boolean;
        "Videos": boolean;
    };
    currentMedia: string;
    setCurrentMedia: (media: string) => void;
    getMedia: (type: string) => Promise<void>;
    //getMediaByTitle: (type: string, title: string) => Promise<void>;
    //addMedia: (type: string, media: any) => Promise<void>;
    //updateMedia: (type: string, id: number) => Promise<void>;
    //deleteMedia: (type: string, id: number) => Promise<void>;
};

export interface Comic {
    id: number;
    title: string;
    chapter: number;
    link: string;
    createdAt: Date;
};

export interface Novel {
    id: number;
    title: string;
    chapter: number;
    page: number;
    link: string;
    createdAt: Date;
};

export interface Video {
    id: number;
    title: string;
    link: string;
    duration: {
        hours: number | undefined;
        minutes: number | undefined;
        seconds: number | undefined;
    };
    createdAt: Date;
};

export const useMediaStore = create<MediaStore>((set, get) => ({
    data: {
        "Novels": [
            {
                id: 1,
                title: "Test Novel",
                chapter: 1,
                page: 1,
                link: "",
                createdAt: new Date(),
            }
        ],
        "Comics": [{
            id: 1,
            title: "Test Comic",
            chapter: 1,
            link: "",
            createdAt: new Date(),
        }],
        "Videos": [],
    },
    loading: {
        "Novels": false,
        "Comics": false,
        "Videos": false,
    },
    currentMedia: "Novels",
    setCurrentMedia: (media) => set({ currentMedia: media }),
    getMedia: async (type: string) => {
        set({ loading: { ...get().loading, [type]: true }});
        try {
            const response = await mediaService.getAll(type);
            set({ data: { ...get().data, [type]: response?.data } });
        } catch (error) {
            console.error("Error grabbing media:", error);
        } finally {
            set({ loading: { ...get().loading, [type]: false }});
        }
    },
    /*getMediaByTitle: async (type: string, title: string) => {
        set({ loading: { ...get().loading, [type]: true }});
        try {
            const response = await mediaService.getByTitle(type, title);
            set({ data: { ...get().data, [type]: response?.data } });
        } catch (error) {
            console.error("Error grabbing media by title:", error);
        } finally {
            set({ loading: { ...get().loading, [type]: false }});
        }
    },
    addMedia: async (type: string, media: any) => {
        try {
            await mediaService.addMedia(type, media);
            await get().getMedia(type);
        } catch (error) {
            console.error("Error adding media:", error);
        }
    },
    updateMedia: async (type: string, id: number) => {
        try {
            await mediaService.updateMedia(type, id);
            await get().getMedia(type);
        } catch (error) {
            console.error("Error updating media:", error);
        }
    }
    */
}));
