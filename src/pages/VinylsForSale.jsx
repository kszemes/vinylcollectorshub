import React, {useEffect, useState} from 'react';
import './VinylsForSale.css'
import {getVinylsOnSale} from "../utility/vinyl_crud.js";
import DataTable from "../components/DataTable.jsx";

export const VinylsForSale = () => {
    const [vinyls, setVinyls] = useState(null);

    useEffect(() => {
        getVinylsOnSale(setVinyls);
    }, []);

    return (
        <div>
            {vinyls ?
                <>
                    <h1>Vinyls for sale: {vinyls.length} piece of record</h1>
                    <div>
                        <DataTable data={vinyls} initialState={
                            {
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                                columns: {
                                    columnVisibilityModel: {
                                        editButton: false,
                                    },
                                },
                            }}/>
                    </div>
                </>
                :
                <div>Loading...</div>
            }
        </div>
    )
};