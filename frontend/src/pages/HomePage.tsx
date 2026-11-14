import { useEffect } from 'react';
import { useMediaStore } from '../store/mediaStore.ts';
import { ArrowRight, Search } from 'lucide-react';
import NovelTable from '../components/NovelTable.tsx';
import VideoTable from '../components/VideoTable.tsx';
import ComicTable from '../components/ComicTable.tsx';

function HomePage() {
    const { currentMedia, data } = useMediaStore();
    
    /*useEffect(() => {
        getMedia(currentMedia);
    }, [currentMedia]);*/
    
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
                    <input type="text" placeholder="Type here" className="input" />
                </label>
            </div>

            { /* Media Table Display */ }
            <div className="outline-2 outline-dotted outline-green-500 p-4">
                {currentMedia === "Videos" && <VideoTable videos={data.Videos}/>}
                {currentMedia === "Novels" && <NovelTable novels={data.Novels} />}
                {currentMedia === "Comics" && <ComicTable comics={data.Comics} />}
            </div>
        </div>
    );
}

export default HomePage;
