import {createContext, useEffect, useState} from "react";
export const recordFormats = ['Acetate', 'Album', 'All Media', 'Blu-ray', 'Box Set', 'Cassette', 'CD', 'CDr', 'DVD', 'DVDr', 'File', 'Film Reel', 'Flexi-disc', 'Floppy Disk', 'HD DVD', 'Hybrid', 'Laserdisc', 'Lathe Cut', 'LP', 'Memory Stick', 'Minidisc', 'Reel-To-Reel', 'SACD', 'Shellac', 'Stereo', 'Track Cartridge', 'Ultra HD Blu-ray', 'VHS', 'Vinyl']
export const FormatContext = createContext();

export const FormatProvider = ({children}) => {
    const [formats, setFormats] = useState(null);
    useEffect(() => {
        setFormats(recordFormats)
    }, []);
    return (
        <FormatContext.Provider value={{formats}}>
            {children}
        </FormatContext.Provider>
    )
}