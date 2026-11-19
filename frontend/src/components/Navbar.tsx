import { Menu } from 'lucide-react';
import { useMediaStore } from '../store/mediaStore.ts';
import { useModalStore } from '../store/modalStore.ts';
import { useShallow } from 'zustand/react/shallow';

function Navbar() {
    const { currentMedia, setCurrentMedia } = useMediaStore(useShallow((state) => ({
        currentMedia: state.currentMedia,
        setCurrentMedia: state.setCurrentMedia,
    })));
    const { openModal } = useModalStore();

    const handleToggle = (event: React.ChangeEvent): void => {
        const id = event.target.id;
        if (currentMedia === id) return;

        if (id === "novelToggle") setCurrentMedia("Novels");
        else if (id === "comicToggle") setCurrentMedia("Comics");
        else setCurrentMedia("Videos");

        console.log(`Current Media: ${currentMedia}`);
    }

    return (
        <div className="navbar bg-slate-950 shadow-sm">
            { /* LEFT END */ }
            <div className="flex-1 outline-2 outline-dotted">
                <a className="btn btn-ghost btn-lg text-2xl outline-dotted outline-2 outline-blue-500">MediaMark</a>
                <button
                       className="btn btn-ghost btn-sm outline-dotted outline-2 outline-green-500"
                       onClick={() => openModal(currentMedia)}>
                    Add {currentMedia}
                </button>
            </div>

            { /* RIGHT END */ }
            <div className="flex-none outline-2 outline-dotted outline-indigo-500">
                { /* DROPDOWN */ }
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <Menu />
                    </div>
                    { /* DROPDOWN MENU */ }

                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-gray-500 rounded-box shadow">
                            <li>
                                <label className="label text-black">
                                    <input id="novelToggle" type="checkbox" checked={currentMedia === "Novels"} className="toggle toggle-md" onChange={handleToggle} />
                                    Novels
                                </label>
                                <label className="label text-black">
                                    <input id="comicToggle" type="checkbox" checked={currentMedia === "Comics"} className="toggle toggle-md" onChange={handleToggle} />
                                    Comics
                                </label>
                                <label className="label text-black">
                                    <input id="videoToggle" type="checkbox" checked={currentMedia === "Videos"} className="toggle toggle-md" onChange={handleToggle} />
                                    Videos
                                </label>
                            </li>
                    </ul>
                </div>
            </div>
        
        </div>
    );
}

export default Navbar;
