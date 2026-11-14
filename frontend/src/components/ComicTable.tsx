import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import type { Comic } from '../store/mediaStore.ts';

function ComicTable({ comics }: { comics: Comic[] }) {
    return (
        <div className="overflow-x-scroll">
            <table className="table table-zebra">
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
                            <td>{comic.createdAt.toLocaleDateString()}</td>
                            <td>
                                <div className="join">
                                    <button className="btn btn-ghost shadow-xl"><Pencil className="size-4"/></button>
                                    <button className="btn btn-ghost shadow-xl"><Trash className="size-4"/></button>
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

