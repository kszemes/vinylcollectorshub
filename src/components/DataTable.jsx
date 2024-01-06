import * as React from 'react';
import {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Details} from "./Details.jsx";
import Button from "@mui/material/Button";
import {AddEditItem} from "./AddEditItem.jsx";
import {EditPicture} from "./EditPicture.jsx";
import {DeleteModal} from "./DeleteModal.jsx";

const thumbnailImageSizeX = 125;
const thumbnailImageSizeY = 125;

export default function DataTable({data, initialState}) {

    const rows = [];
    const [row, setRow] = useState(null);
    const dataArray = Array.from(data);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditPictureModal, setOpenEditPictureModal] = useState(false);

    const handleOpenDetailModal = (row) => {
        setRow(row);
        setOpenDetailModal(true);
    };

    const handleCloseDetailModal = () => {
        setOpenDetailModal(false);
    };

    const handleOpenEditModal = (row) => {
        setRow(row);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    };

    const handleOpenDeleteModal = (row) => {
        setRow(row);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleOpenEditPictureModal = (row) => {
        setRow(row);
        setOpenEditPictureModal(true);
    };

    const handleCloseEditPictureModal = () => {
        setOpenEditPictureModal(false);
    };

    for (let object of dataArray) {
        rows.push({...object})
    }

    const sendEmailToOwner = (e) => {
        let emailSubject = encodeURIComponent('Record buying request');
        let emailBody = encodeURIComponent('Hi, \n\nI wolud like to buy the following record from you: \n\n');
        window.location.href = 'mailto:'+e.target?.id+'?subject=' + emailSubject + '&body=' + emailBody;
    }

    const columns = [
        {
            field: "thumbnailImage",
            headerName: "Thumbnail",
            width: thumbnailImageSizeX,
            height: thumbnailImageSizeY,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={() => handleOpenDetailModal(params.row)}>
                            {<img style={{maxWidth: thumbnailImageSizeX, maxHeight: thumbnailImageSizeY, padding: '5px'}}
                                  src={params.row.image} alt='Record Image'/>}
                        </Button>
                    </>
                );
            }
        },
        {field: 'artist', headerName: 'Artist', minWidth: 120},
        {field: 'title', headerName: 'Title', minWidth: 180},
        {field: 'label', headerName: 'Label', minWidth: 220},
        {
            field: 'format',
            headerName: 'Format',
            width: 100,
            renderCell: (formats) => <div>{formats.value.map((data) => <li key={data}>{data}</li>)}</div>
        },
        {field: 'country', headerName: 'Country', width: 100},
        {field: 'released', headerName: 'Released', width: 75},
        {field: 'genre', headerName: 'Genre', width: 180},
        {
            field: 'style',
            headerName: 'Style',
            width: 150,
            renderCell: (styles) => <div>{styles.value.map((data) => <li key={data}>{data}</li>)}</div>
        },
        {field: 'forSale', headerName: 'For Sale?', width: 80},
        {field: 'price', headerName: 'Price', width: 80},
        {
            field: 'email', headerName: 'Email', width: 65,
            renderCell: (params) => {
                if (params.row.userEmail.length > 0)
                return  <button id={params.row.userEmail} className="btn btn-secondary" onClick={sendEmailToOwner}>Buy!</button>
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            description: 'Actions column',
            width: 120,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div>
                        <div className='row'>
                            <button onClick={() => handleOpenEditModal(params.row)} className='btn btn-success col-5'>Edit</button>
                            <button onClick={() => handleOpenDeleteModal(params.row)} className='btn btn-danger col-7'>Delete</button>
                        </div>
                        <div className='row'>
                            <button onClick={() => handleOpenEditPictureModal(params.row)} className='btn btn-info'>Edit Image</button>
                        </div>
                    </div>
                );
            }
        }
    ];

    return (
        <>
        <DataGrid
                rows={rows}
                getRowHeight={() => 'auto'}
                getRowId={(row) => row?.id}
                columns={columns}
                pageSizeOptions={[5, 10]}
                initialState={initialState}
                autoHeight={true}
            />
            {(openEditModal === true) ?
                <AddEditItem
                    open={openEditModal}
                    onOpen={handleOpenEditModal}
                    onClose={handleCloseEditModal}
                    object={row}
                    handleClose={handleCloseEditModal}
                /> : <></>
            }
            {(openDetailModal === true) ?
                <Details
                    open={openDetailModal}
                    onOpen={handleOpenDetailModal}
                    onClose={handleCloseDetailModal}
                    row={row}
                /> : <></>
            }
            {(openEditPictureModal === true) ?
                <EditPicture
                    open={openEditPictureModal}
                    onOpen={handleOpenEditPictureModal}
                    onClose={handleCloseEditPictureModal}
                    row={row}
                    handleClose={handleCloseEditPictureModal}
                /> : <></>
            }
            {(openDeleteModal === true) ?
            <DeleteModal
                    open={openDeleteModal}
                    onOpen={handleOpenDeleteModal}
                    onClose={handleCloseDeleteModal}
                    row={row}
                    handleClose={handleCloseDeleteModal}
                /> : <></>
            }
        </>
    );
}