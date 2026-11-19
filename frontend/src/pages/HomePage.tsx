import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useMediaStore } from '../store/mediaStore.ts';
import { ArrowRight, Search } from 'lucide-react';
import NovelTable from '../components/NovelTable.tsx';
import VideoTable from '../components/VideoTable.tsx';
import ComicTable from '../components/ComicTable.tsx';

function HomePage() {
    const { currentMedia, data, loading, getMedia } = useMediaStore(useShallow((state) =>({
        currentMedia: state.currentMedia,
        data: state.data,
        loading: state.loading,
        getMedia: state.getMedia,
    })));
    
    useEffect(() => {
        getMedia(currentMedia);
    }, [currentMedia]);
    
    return (
        <div className="outline-2 outline-dotted outline-red-400 p-4">
            
            { /* Current Media Display */ }
            <div className="flex items-center outline-2 outline-dotted outline-blue-500">
                <ArrowRight className="size-7"/>
                <div className="text-xl flex-1 p-2">{currentMedia}</div>
            </div>

            { /* Search Bar */ }
            <div className="flex outline-2 outline-dotted outline-amber-500 p-4">
                <label className="input flex-1">
                    <span><Search className="size-5"/></span>
                    <input type="text" placeholder="Search By Title" className="input" />
                    <button className="btn btn-ghost btn-sm" onClick={() => console.log("Do nothing")}>Search</button>
                </label>
            </div>

            { /* Media Table Display */ }
            <div className="outline-2 outline-dotted outline-green-500 p-4 flex flex-1 place-items-center justify-center">
                {loading[currentMedia as keyof typeof loading] && <span className="loading loading-bars loading-xl"></span>}
                {currentMedia === "Videos" && !loading["Videos"] && <VideoTable videos={data["Videos"]} />}
                {currentMedia === "Novels" && !loading["Novels"] && <NovelTable novels={data["Novels"]} />}
                {currentMedia === "Comics" && !loading["Comics"] && <ComicTable comics={data["Comics"]} />}
            </div>
        </div>
    );
}

export default HomePage;
