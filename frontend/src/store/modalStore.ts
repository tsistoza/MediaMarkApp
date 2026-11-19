import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    currentMedia: string;
    openModal: (media: string) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    currentMedia: '',
    openModal: (media) => set({ isOpen: true, currentMedia: media }),
    closeModal: () => set({ isOpen: false, currentMedia: '' }),
}));
