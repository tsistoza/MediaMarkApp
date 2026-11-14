import axios from "axios";

const BASE_URL = "http://localhost:3000";

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
        }
    },

    getByTitle: async (type: string, title: string) => {
        try {
            const data = await axios.get(`${BASE_URL}/api/${map[type as keyof typeof map]}?q=${title}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    addMedia: async (type: string, media: any) => {
        try {
            const data = await axios.post(`${BASE_URL}/api/${map[type as keyof typeof map]}`, media);
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    updateMedia: async (type: string, media: any) => {
        try {
            const data = await axios.put(`${BASE_URL}/api/${map[type as keyof typeof map]}`, media);
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    deleteMedia: async (type: string, id: number) => {
        try {
            const data = await axios.delete(`${BASE_URL}/api/${map[type as keyof typeof map]}/${id}`);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default mediaService;
