import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Details} from "../pages/Details.jsx";
import Button from "@mui/material/Button";

const thumbnailImageSizeX = 125;
const thumbnailImageSizeY = 125;

export default function DataTable({data}) {

    const rows = [];
    const dataArray = Array.from(data);
    for (let object of dataArray) {
        rows.push({...object})
    }

    const OpenModalButton = ({ row }) => {
        const [open, setOpen] = React.useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };
        return (
            <>
                <Button onClick={handleOpen}>{row.title}</Button>
                <Details
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    row={row}
                />
            </>
        );
    };

    const columns = [
        {
            field: "thumbnailImage",
            headerName: "Thumbnail",
            width: thumbnailImageSizeX,
            height: thumbnailImageSizeY,
            renderCell: (thumbnailImage) =>
                    <img style={{maxWidth: thumbnailImageSizeX, maxHeight: thumbnailImageSizeY, padding: '5px'}}
                         src={thumbnailImage.value}
                         alt='Record Picture'/>
        },
        { field: 'artist', headerName: 'Artist' },
        { field: 'title',
            headerName: 'Title',
            renderCell: OpenModalButton},
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
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                getRowHeight={() => 'auto'}
                getRowId={(row) => row?.id}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}