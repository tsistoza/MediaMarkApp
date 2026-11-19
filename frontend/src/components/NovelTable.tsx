import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import { useMediaStore, type Novel } from '../store/mediaStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { useModalStore } from '../store/modalStore.ts';

function NovelTable({ novels }: { novels: Novel[]}) {
    const { setFormData, deleteMedia } = useMediaStore(useShallow((state) => ({
        setFormData: state.setFormData,
        deleteMedia: state.deleteMedia
    })));
    const { openModal } = useModalStore();
    const handleEdit = (novel: Novel) => {
        setFormData({
            id: novel.id,
            title: novel.title,
            chapter: novel.chapter,
            page: novel.page,
            duration: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            link: novel.link
        });
        openModal("Novels");
    }
    return (
        <div className="overflow-x-scroll flex-1">
            <table className="table table-zebra text-base">
                <thead>
                    <tr className="hover:bg-gray-500">
                        <th className="w-1/12">ID</th>
                        <th className="w-auto">Title</th>
                        <th className="w-1/12">Chapter</th>
                        <th className="w-1/12">Page</th>
                        <th className="w-1/6">Created At</th>
                        <th className="w-1/6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {novels.map((novel) => (
                        <tr key={novel.id} className="hover:bg-gray-500">
                            <td>{novel.id}</td>
                            <td>{novel.title}</td>
                            <td><a href={novel.link} className="hover:text-blue-300">{novel.chapter}</a></td>
                            <td><a href={novel.link} className="hover:text-blue-300">{novel.page}</a></td>
                            <td>{new Date(novel.created_at).toLocaleDateString()}</td>
                            <td>
                                <div className="join">
                                    <button className="btn btn-ghost shadow-xl" onClick={() => handleEdit(novel)}><Pencil className="size-4"/></button>
                                    <button className="btn btn-ghost shadow-xl" onClick={() => deleteMedia(novel.id)}><Trash className="size-4"/></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default NovelTable;

