import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {useForm} from "react-hook-form";
import {read, getVinylsByUid} from "../utility/vinyl_crud.js";
import {NotFound} from "./NotFound.jsx";
import DataTable from "../components/DataTable.jsx";

export const MyCollection = () => {
    const {user} = useContext(UserContext)
    const [vinyls, setVinyls] = useState(null);

    useEffect(() => {
        getVinylsByUid(setVinyls, user);
    }, []);

    if (!user) return (<NotFound/>)

    return (
        <div>
            {vinyls ?
                <>
                    <h1>My Collection: {vinyls.length} piece of record</h1>
                    <div>
                        <DataTable data={vinyls}/>
                    </div>
                </>
                :
                <div>Loading...</div>
            }
        </div>
    )
};