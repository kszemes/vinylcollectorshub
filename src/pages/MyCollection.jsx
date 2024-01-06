import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {getVinylsByUid} from "../utility/vinyl_crud.js";
import {NotFound} from "./NotFound.jsx";
import DataTable from "../components/DataTable.jsx";
import {AddEditItem} from "../components/AddEditItem.jsx";

export const MyCollection = () => {

    const {user} = useContext(UserContext)
    const [vinyls, setVinyls] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (user) getVinylsByUid(setVinyls, user);
    }, []);

    if (!user) return (<NotFound/>)

    return (
        <div>
            {vinyls ?
                <>
                    <h1>My Collection: {vinyls.length} piece of record</h1>
                    <button className='btn btn-success' onClick={handleOpen}>New Record</button>
                    <div>
                        <DataTable data={vinyls} initialState={
                                {
                                    pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                                    columns: {
                                        columnVisibilityModel: {
                                            actions: true,
                                            email: false
                                        },
                                    },
                        }}/>
                    </div>
                    <AddEditItem open={open}
                                 onOpen={handleOpen}
                                 onClose={handleClose}
                                 id={null}
                                 handleClose={handleClose}
                    />
                </>
                :
                <div>Loading...</div>
            }
        </div>
    )
};