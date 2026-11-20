import React, { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useMediaStore } from '../store/mediaStore.ts';
import { useModalStore } from '../store/modalStore.ts';

function Modal() {
    const modalRef = React.useRef<HTMLDialogElement>(null);
    const { formData, setFormData, addMedia, updateMedia, loading } = useMediaStore(useShallow((state) => ({
        formData: state.formData,
        setFormData: state.setFormData,
        addMedia: state.addMedia,
        updateMedia: state.updateMedia,
        loading: state.loading,
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
                duration: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                },
                link: '#',
            });
            modalRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            <form method="dialog" className="modal-box w-base">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Add {currentMedia}</legend>
                    <label className="label">Title</label>
                            <input type="text" 
                                    placeholder="Enter Title" 
                                    className="input input-bordered w-full"
                                    value={formData.title ?? ''}
                                    maxLength={255}
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
                                            onChange={(e) => setFormData({ ...formData, chapter: Number(e.target.value) })} /> 
                                </div>
                                <div className="col-span-1">
                                    <label className="label pr-2">Page</label>
                                    <input type="number" 
                                            placeholder="Enter Page"
                                            className="input input-bordered w-1/3"
                                            min="1"
                                            value={formData.page} 
                                            onChange={(e) => setFormData({ ...formData, page: Number(e.target.value) })} />
                                </div>
                            </div>
                        </>
                    )}

                    {currentMedia === "Comics" && (
                        <>
                            <div className="join grid grid-flow-col grid-cols-2 gap-4 p-2">
                                <div className="col-span-1">
                                    <label className="label pr-2">Chapter</label>
                                    <input type="number" 
                                            placeholder="Enter Chapter"
                                            className="input input-bordered w-1/3"
                                            min="1"
                                            value={formData.chapter} 
                                            onChange={(e) => setFormData({ ...formData, chapter: Number(e.target.value) })} />
                                </div>
                            </div>
                        </>
                    )}

                    {currentMedia === "Videos" && (
                        <>
                            <div className="join grid grid-flow-col grid-rows-2 grid-cols-3 gap-4 p-2">
                                <div className="col-span-3">
                                    <label className="label pr-2">Duration</label>
                                </div>
                                <div className="col-span-1">
                                    <label className="label pr-2">Hours</label>
                                    <input type="number" 
                                            placeholder="Enter Duration"
                                            className="input input-bordered w-1/2"
                                            min="0"
                                            value={formData.duration.hours} 
                                            onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, hours: Number(e.target.value)} })} />
                                </div>
                                <div className="col-span-1">
                                    <label className="label pr-2">Minutes</label>
                                    <input type="number" 
                                            placeholder="Enter Duration"
                                            className="input input-bordered w-1/2"
                                            min="0"
                                            max="59"
                                            value={formData.duration.minutes} 
                                            onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, minutes: Number(e.target.value)} })} />
                                </div>
                                <div className="col-span-1">
                                    <label className="label pr-2">Seconds</label>
                                    <input type="number" 
                                            placeholder="Enter Duration"
                                            className="input input-bordered w-1/2"
                                            min="0"
                                            max="59"
                                            value={formData.duration.seconds} 
                                            onChange={(e) => setFormData({ ...formData, duration: { ...formData.duration, seconds: Number(e.target.value)} })} />
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
                    {formData.id ? (
                        <button className="btn btn-warning" onClick={() => updateMedia(formData)}
                                disabled={!formData.title || loading[currentMedia as keyof typeof loading]}>
                            {loading[currentMedia as keyof typeof loading] ? "Updating..." : `Update ${currentMedia}`}
                        </button>
                    ) : (
                        <button className="btn btn-primary" 
                                disabled={!formData.title || loading[currentMedia as keyof typeof loading]}
                                onClick={() => addMedia(currentMedia, formData)}>
                            {loading[currentMedia as keyof typeof loading] ? "Adding..." : `Add ${currentMedia}`}
                        </button>
                    )}
                    
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
