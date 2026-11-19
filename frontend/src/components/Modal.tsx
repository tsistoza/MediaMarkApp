import React, { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useMediaStore } from '../store/mediaStore.ts';
import { useModalStore } from '../store/modalStore.ts';

function Modal() {
    const modalRef = React.useRef<HTMLDialogElement>(null);
    const { formData, setFormData } = useMediaStore(useShallow((state) => ({
        formData: state.formData,
        setFormData: state.setFormData,
    })));
    const { isOpen, currentMedia, closeModal } = useModalStore();

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal();
        } else {
            setFormData({
                title: undefined,
                chapter: 1,
                page: 1,
                duration: 0,
                link: '#',
            });
            modalRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            <form method="dialog" className="modal-box w-sm">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Add {currentMedia}</legend>
                    <label className="label">Title</label>
                            <input type="text" 
                                    placeholder="Enter Title" 
                                    className="input input-bordered w-full"
                                    value={formData.title ?? ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

                    {currentMedia === "Novels" && (
                        <>
                            <div className="join grid grid-flow-col grid-cols-2 gap-4 p-2">
                                <div className="col-span-1">
                                    <label className="label pr-2">Chapter</label>
                                    <input type="number"
                                            placeholder="Enter Chapter" 
                                            className="input input-bordered w-1/3"
                                            min="1"
                                            value={formData.chapter} 
                                            onChange={(e) => setFormData({ ...formData, chapter: e.target.value })} /> 
                                </div>
                                <div className="col-span-1">
                                    <label className="label pr-2">Page</label>
                                    <input type="number" 
                                            placeholder="Enter Page"
                                            className="input input-bordered w-1/3"
                                            min="1"
                                            value={formData.page} 
                                            onChange={(e) => setFormData({ formData: { ...formData, page: e.target.value } })} />
                                </div>
                            </div>
                        </>
                    )}

                    {currentMedia === "Comics" && (
                        <>
                            <div className="join grid grid-flow-col grid-cols-2 gap-4 p-2">
                                <div className="col-span-1">
                                    <label className="label pr-2">Page</label>
                                    <input type="number" 
                                            placeholder="Enter Page"
                                            className="input input-bordered w-1/3"
                                            min="1"
                                            value={formData.page} 
                                            onChange={(e) => setFormData({ formData: { ...formData, page: e.target.value } })} />
                                </div>
                            </div>
                        </>
                    )}

                    {currentMedia === "Videos" && (
                        <>
                            <div className="join grid grid-flow-col grid-cols-2 gap-4 p-2">
                                <div className="col-span-1">
                                    <label className="label pr-2">Duration</label>
                                    <input type="number" 
                                            placeholder="Enter Duration"
                                            className="input input-bordered w-1/3"
                                            min="0"
                                            value={formData.duration} 
                                            onChange={(e) => setFormData({ formData: { ...formData, duration: e.target.value } })} />
                                </div>
                            </div>
                        </>
                    )}

                    <label className="label">Link</label>
                    <input type="text" 
                            placeholder="Enter Link"
                            className="input input-bordered w-full" 
                            value={formData.link} 
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })} />

                    <button className="btn btn-primary" 
                            type="submit" 
                            disabled={!formData.title}>
                        Add
                    </button>
                    <p className="label">Click outside to close</p>
                </fieldset>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}>
                    close
                </button>
            </form>
        </dialog>
    )
}

export default Modal;
