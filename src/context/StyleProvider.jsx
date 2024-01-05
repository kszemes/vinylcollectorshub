import {createContext, useEffect, useState} from "react";
export const recordStyle = ['Abstract', 'Acid', 'Acid House', 'Acoustic', 'African', 'Alternative Rock', 'Ambient', 'Art Rock', 'Avantgarde', 'Ballad', 'Baroque', 'Beat', 'Big Band', 'Black Metal', 'Blues Rock', 'Boogie', 'Bop', 'Breakbeat', 'Breaks', 'Chanson', 'Classic Rock', 'Classical', 'Comedy', 'Contemporary', 'Contemporary Jazz', 'Contemporary R&B', 'Cool Jazz', 'Country', 'Country Rock', 'Dancehall', 'Deep House', 'Disco', 'Doo Wop', 'Downtempo', 'Drum n Bass', 'Dub', 'Easy Listening', 'Electro', 'Euro House', 'Europop', 'Experimental', 'Folk', 'Folk Rock', 'Funk', 'Fusion', 'Garage House', 'Garage Rock', 'Glam', 'Gospel', 'Hard Bop', 'Hard House', 'Hard Rock', 'Hard Trance', 'Hardcore', 'Heavy Metal', 'Holiday', 'House', 'Indie Rock', 'Industrial', 'Instrumental', 'Italo-Disco', 'Jazz-Funk', 'Jazz-Rock', 'Kayōkyoku', 'Latin Jazz', 'Leftfield', 'Minimal', 'Modern', 'Musical', 'New Wave', 'Opera', 'Pop Rap', 'Pop Rock', 'Post-Punk', 'Power Pop', 'Prog Rock', 'Progressive House', 'Progressive Trance', 'Psychedelic Rock', 'Punk', 'Reggae', 'Rhythm & Blues', 'RnB/Swing', 'Rock & Roll', 'Rockabilly', 'Romantic', 'Roots Reggae', 'Schlager', 'Score', 'Soft Rock', 'Soul', 'Soul-Jazz', 'Soundtrack', 'Swing', 'Synth-pop', 'Tech House', 'Techno', 'Theme', 'Trance', 'Vocal']
export const StyleContext = createContext();

export const StyleProvider = ({children}) => {
    const [styles, setStyles] = useState(null);
    useEffect(() => {
        setStyles(recordStyle)
    }, []);
    return (
        <StyleContext.Provider value={{styles}}>
            {children}
        </StyleContext.Provider>
    )
}