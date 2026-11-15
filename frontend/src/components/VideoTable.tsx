import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';
import type { Video } from '../store/mediaStore.ts';

function VideoTable({ videos }: { videos: Video[]}) {
    const formatDuration = (duration: Video['duration']) => {
        const { hours, minutes, seconds } = duration;
        const hoursString = hours ? hours.toString().padStart(2, '0') : '00';
        const minutesString = minutes ? minutes.toString().padStart(2, '0') : '00';
        const secondsString = seconds ? seconds.toString().padStart(2, '0') : '00';
        return `${hoursString}:${minutesString}:${secondsString}`;
    };

    return (
        <div className="overflow-x-scroll flex-1">
            <table className="table table-zebra text-base">
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
                    {videos.map((video) => (
                        <tr key={video.id} className="hover:bg-gray-500">
                            <td>{video.id}</td>
                            <td>{video.title}</td>
                            <td><a href={video.link} className="hover:text-blue-300">{formatDuration(video.duration)}</a></td>
                            <td>{video.createdAt.toLocaleDateString()}</td>
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

export default VideoTable;

