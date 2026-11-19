import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import { type Comic, useMediaStore } from '../store/mediaStore.ts';
import { useShallow } from 'zustand/shallow';
import { useModalStore } from '../store/modalStore.ts';

function ComicTable({ comics }: { comics: Comic[] }) {
    const { setFormData, deleteMedia } = useMediaStore(useShallow((state) => ({
        setFormData: state.setFormData,
        deleteMedia: state.deleteMedia
    })));
    const { openModal } = useModalStore(useShallow((state) => ({
        openModal: state.openModal,
    })));
    const handleEdit = (comic: Comic) => {
        setFormData({
            id: comic.id,
            title: comic.title,
            chapter: comic.chapter,
            page: 1,
            duration: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            link: comic.link
        });
        openModal("Comics");
    };
    return (
        <div className="overflow-x-scroll flex-1">
            <table className="table table-zebra text-base">
                <thead>
                    <tr className="hover:bg-gray-500">
                        <th className="w-1/12">ID</th>
                        <th className="w-auto">Title</th>
                        <th className="w-1/12">Chapter</th>
                        <th className="w-1/6">Created At</th>
                        <th className="w-1/6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comics.map((comic) => (
                        <tr key={comic.id} className="hover:bg-gray-500">
                            <td>{comic.id}</td>
                            <td>{comic.title}</td>
                            <td><a href={comic.link} className="hover:text-blue-300">{comic.chapter}</a></td>
                            <td>{new Date(comic.created_at).toLocaleDateString()}</td>
                            <td>
                                <div className="join">
                                    <button className="btn btn-ghost shadow-xl" onClick={() => handleEdit(comic)}><Pencil className="size-4"/></button>
                                    <button className="btn btn-ghost shadow-xl" onClick={() => deleteMedia(comic.id)}><Trash className="size-4"/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ComicTable;

