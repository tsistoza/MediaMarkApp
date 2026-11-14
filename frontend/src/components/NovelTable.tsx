import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import type { Novel } from '../store/mediaStore.ts';

function NovelTable({ novels }: { novels: Novel[]}) {
    return (
        <div className="overflow-x-scroll">
            <table className="table table-zebra">
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
                            <td>{novel.createdAt.toLocaleDateString()}</td>
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

export default NovelTable;

