import { create } from "zustand";
import mediaService from "../services/mediaService.ts";
import { useModalStore } from "./modalStore.ts";

export interface Comic {
    id: number;
    title: string;
    chapter: number;
    link: string;
    created_at: Date;
};

export interface Novel {
    id: number;
    title: string;
    chapter: number;
    page: number;
    link: string;
    created_at: Date;
};

export interface Video {
    id: number;
    title: string;
    link: string;
    duration: {
        hours?: number | undefined;
        minutes?: number | undefined;
        seconds?: number | undefined;
    };
    created_at: Date;
};

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
    formData: {
        title?: string;
        chapter: number;
        page: number;
        duration: number;
        link: string;
    };
    currentMedia: string;
    setCurrentMedia: (media: string) => void;
    getMedia: (type: string) => Promise<void>;
    getMediaByTitle: (type: string, title: string) => Promise<void>;
    addMedia: (type: string, media: any) => Promise<void>;
    setFormData: (formData: any) => void;
    //updateMedia: (type: string, id: number) => Promise<void>;
    //deleteMedia: (type: string, id: number) => Promise<void>;
};

export const useMediaStore = create<MediaStore>((set, get) => ({
    data: {
        "Novels": [],
        "Comics": [],
        "Videos": [],
    },
    loading: {
        "Novels": false,
        "Comics": false,
        "Videos": false,
    },
    formData: {
        title: undefined,
        chapter: 1,
        page: 1,
        duration: 0,
        link: "#",
    },
    currentMedia: "Novels",
    setCurrentMedia: (media) => set({ currentMedia: media }),
    getMedia: async (type: string) => {
        set({ loading: { ...get().loading, [type]: true }});
        try {
            const response = await mediaService.getAll(type);
            set({ data: { ...get().data, [type]: response?.data.data }, loading: { ...get().loading, [type]: false }});
        } catch (error) {
            console.error("Error grabbing media:", error);
            set({ loading: { ...get().loading, [type]: false }});
        }
    },
    getMediaByTitle: async (type: string, title: string) => {
        set({ loading: { ...get().loading, [type]: true }});
        try {
            const response = await mediaService.getByTitle(type, title);
            set({ data: { ...get().data, [type]: response?.data.data }, loading: { ...get().loading, [type]: false }});
        } catch (error) {
            console.error("Error grabbing media by title:", error);
            set({ loading: { ...get().loading, [type]: false }});
        }
    },
    setFormData: (formData) => {
        set({ formData: { ...formData } });
    },
    addMedia: async (type: string, media: any) => {
        try {
            await mediaService.addMedia(type, media);
            await get().getMedia(type);
            set({ formData: { title: undefined, chapter: 1, page: 1, duration: 0, link: '#' } });
            useModalStore.getState().closeModal();
        } catch (error) {
            console.error("Error adding media:", error);
            set({ formData: { title: undefined, chapter: 1, page: 1, duration: 0, link: '#' } });
            useModalStore.getState().closeModal();
        }
    },
    updateMedia: async (type: string, id: number) => {
        try {
            await mediaService.updateMedia(type, id);
            await get().getMedia(type);
        } catch (error) {
            console.error("Error updating media:", error);
        }
    },
}));
