import React, { useEffect } from 'react';
import { useModalStore } from '../store/modalStore.ts';

function Modal() {
    const modalRef = React.useRef<HTMLDialogElement>(null);
    const { isOpen, currentMedia, closeModal } = useModalStore();

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.showModal();
        } else {
            modalRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            <form method="dialog" className="modal-box w-sm">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-lg">Add {currentMedia}</legend>
                    {currentMedia === "Novels" && (
                        <>
                            <label className="label">Title</label>
                            <input type="text" 
                                    placeholder="Enter Novel Title" 
                                    className="input input-bordered w-full" />

                            <div className="join grid grid-flow-col grid-cols-2 gap-4">
                                <div className="col-span-1">
                                    <label className="label pr-2">Chapter</label>
                                    <input type="number" 
                                            placeholder="Enter Chapter" 
                                            className="input input-bordered w-1/3"
                                            min="1"
                                            defaultValue="1" />
                                </div>
                                <div className="col-span-1">
                                    <label className="label pr-2">Page</label>
                                    <input type="number" 
                                            placeholder="Enter Page"
                                            className="input input-bordered w-1/3"
                                            min="1"
                                            defaultValue="1" />
                                </div>
                            </div>
                            
                            <label className="label">Link</label>
                            <input type="text" 
                                    placeholder="Enter Link"
                                    className="input input-bordered w-full" 
                                    defaultValue="#" />

                        </>
                    )}
                    <button className="btn btn-primary" type="submit">Add</button>
                </fieldset>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}>close</button>
            </form>
        </dialog>
    )
}

export default Modal;
