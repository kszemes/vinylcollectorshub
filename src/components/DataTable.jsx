import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Details} from "../pages/Details.jsx";
import Button from "@mui/material/Button";
import {useState} from "react";
import {AddEditItem} from "../pages/AddEditItem.jsx";

const thumbnailImageSizeX = 125;
const thumbnailImageSizeY = 125;

export default function DataTable({data, initialState}) {

    const rows = [];
    const [row, setRow] = useState(null);
    const dataArray = Array.from(data);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleOpenDetailModal = () => {
        setOpenDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setOpenDetailModal(false);
    };

    const handleOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    for (let object of dataArray) {
        rows.push({...object})
    }

    const handleDetailModal = ({ row }) => {
        return (
            <>
                <Button onClick={handleOpenDetailModal}>
                    {<img style={{maxWidth: thumbnailImageSizeX, maxHeight: thumbnailImageSizeY, padding: '5px'}}
                          src={row.thumbnailImage} alt='Record Picture' />}
                </Button>
                <Details
                    open={openDetailModal}
                    onOpen={handleOpenDetailModal}
                    onClose={handleCloseDetailModal}
                    row={row}
                />
            </>
        );
    };

    const handleEditModal = (row) => {
        setRow(row);
        handleOpenEditModal();
    };

    const columns = [
        {
            field: "thumbnailImage",
            headerName: "Thumbnail",
            width: thumbnailImageSizeX,
            height: thumbnailImageSizeY,
            renderCell: handleDetailModal
        },
        { field: 'artist', headerName: 'Artist' },
        { field: 'title', headerName: 'Title'},
        { field: 'label', headerName: 'Label', minWidth: 120},
        {
            field: 'format',
            headerName: 'Format',
            width: 100,
            renderCell: (formats) => <div>{formats.value.map((data) => <li key={data}>{data}</li>)}</div>
        },
        { field: 'country', headerName: 'Country', width: 100},
        { field: 'released', headerName: 'Released', width: 75 },
        { field: 'genre', headerName: 'Genre', width: 100 },
        {
            field: 'style',
            headerName: 'Style',
            width: 130,
            renderCell: (styles) => <div>{styles.value.map((data) => <li key={data}>{data}</li>)}</div>
        },
        { field: 'forSale', headerName: 'For Sale?', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: 'editButton',
            headerName: 'Actions',
            description: 'Actions column',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={()=> handleEditModal(params.row)}
                        variant='contained'
                    >
                        Edit
                    </Button>
                );
            }
        }
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowHeight={() => 'auto'}
                getRowId={(row) => row?.id}
                columns={columns}
                pageSizeOptions={[5, 10]}
                initialState={initialState}
            />
            {(openEditModal===true) ?
            <AddEditItem
                open={openEditModal}
                onOpen={handleOpenEditModal}
                onClose={handleCloseEditModal}
                object={row}
                handleClose={handleCloseEditModal}
            /> : <></>
            }
        </div>
    );
}