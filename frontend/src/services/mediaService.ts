import axios, { type AxiosResponse } from "axios";
import type { formDataRaw } from "../store/mediaStore.ts";
//import dotenv from "dotenv";

//dotenv.config();

const BASE_URL = 'http://localhost:3000';

const map = {
    "Novels": "novels",
    "Comics": "comics",
    "Videos": "videos"
};

const mediaService = {
    getAll: async (type: string) => {
        try {
            const data = await axios.get(`${BASE_URL}/api/${map[type as keyof typeof map]}`);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(`Error fetching ${type}: ${error}`);
        }
    },

    getByTitle: async (type: string, title: string) => {
        try {
            const data = await axios.get(`${BASE_URL}/api/${map[type as keyof typeof map]}?q=${title}`);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(`Error fetching ${type} by title=${title}: ${error}`);
        }
    },

    addMedia: async (type: string, formData: formDataRaw) => {
        console.log(`Adding media of type ${type} with data: ${JSON.stringify(formData)}`);
        const novelData = {
            title: formData.title,
            chapter: formData.chapter,
            page: formData.page,
            link: formData.link,
        };
        const comicData = {
            title: formData.title,
            chapter: formData.chapter,
            link: formData.link,
        };
        const videoData = {
            title: formData.title,
            duration: (formData.duration.hours ?? 0) * 3600 + (formData.duration.minutes ?? 0) * 60 + (formData.duration.seconds ?? 0),
            link: formData.link,
        };

        try {
            let data: AxiosResponse<any>;
            if (type === "Novels") data = await axios.post(`${BASE_URL}/api/${map[type as keyof typeof map]}`, novelData);
            else if (type === "Comics") data = await axios.post(`${BASE_URL}/api/${map[type as keyof typeof map]}`, comicData);
            else data = await axios.post(`${BASE_URL}/api/${map[type as keyof typeof map]}`, videoData);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(`Error adding ${type}: ${error}`);
        }
    },

    updateMedia: async (type: string, formData: formDataRaw) => {
        const id = formData.id!;
        const novelData = {
            title: formData.title,
            chapter: formData.chapter,
            page: formData.page,
            link: formData.link
        };
        const comicData = {
            title: formData.title,
            chapter: formData.chapter,
            link: formData.link
        };
        const videoData = {
            title: formData.title,
            duration: (formData.duration.hours ?? 0) * 3600 + (formData.duration.minutes ?? 0) * 60 + (formData.duration.seconds ?? 0),
            link: formData.link
        };

        try {
            let data: AxiosResponse<any>;
            if (type === "Novels") data = await axios.put(`${BASE_URL}/api/${map[type as keyof typeof map]}/${id}`, novelData);
            else if (type === "Comics") data = await axios.put(`${BASE_URL}/api/${map[type as keyof typeof map]}/${id}`, comicData);
            else data = await axios.put(`${BASE_URL}/api/${map[type as keyof typeof map]}/${id}`, videoData);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(`Error updating ${type}: ${error}`);
        }
    },

    deleteMedia: async (type: string, id: number) => {
        try {
            const data = await axios.delete(`${BASE_URL}/api/${map[type as keyof typeof map]}/${id}`);
            return data;
        } catch (error) {
            console.error(error);
            throw new Error(`Error deleting ${type} with id=${id}: ${error}`);
        }
    }
}

export default mediaService;
