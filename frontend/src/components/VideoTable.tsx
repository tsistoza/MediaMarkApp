import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';

function VideoTable() {
    return (
        <div className="overflow-x-scroll">
            <table className="table table-zebra">
                <thead>
                    <tr className="hover:bg-gray-500">
                        <th className="w-1/12">ID</th>
                        <th className="w-auto">Title</th>
                        <th className="w-1/12">Duration</th>
                        <th className="w-1/6">Created At</th>
                        <th className="w-1/6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-gray-500">
                        <td>1</td>
                        <td>Example Video</td>
                        <td><a href="#" className="hover:text-blue-300">00:01:00</a></td>
                        <td>2024-06-01</td>
                        <td>
                            <div className="join">
                                <button className="btn btn-ghost shadow-xl"><Pencil className="size-4"/></button>
                                <button className="btn btn-ghost shadow-xl"><Trash className="size-4"/></button>
                            </div>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-500">
                        <td>2</td>
                        <td>Another Video</td>
                        <td><a href="#" className="hover:text-blue-300">00:02:00</a></td>
                        <td>2024-06-02</td>
                        <td>
                            <div className="join">
                                <button className="btn btn-ghost shadow-xl"><Pencil className="size-4"/></button>
                                <button className="btn btn-ghost shadow-xl"><Trash className="size-4"/></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default VideoTable;

