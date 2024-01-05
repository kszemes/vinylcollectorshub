import {createContext, useEffect, useState} from "react";
export const recordGenres = ['Blues', 'Brass & Military', 'Children\'s', 'Classical', 'Electronic', 'Folk, World, & Country', 'Funk / Soul', 'Genre', 'Hip Hop', 'Jazz', 'Latin', 'Non-Music', 'Pop', 'Reggae', 'Rock', 'Stage & Screen']
export const GenreContext = createContext();

export const GenreProvider = ({children}) => {
    const [genres, setGenres] = useState(null);
    useEffect(() => {
        setGenres(recordGenres)
    }, []);
    return (
        <GenreContext.Provider value={{genres}}>
            {children}
        </GenreContext.Provider>
    )
}