import React, {useEffect, useState} from 'react';
import {Backdrop, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {deleteFile} from "../utility/file_crud.js";
import {delete_, read} from "../utility/vinyl_crud.js";

const style = {
    position: 'absolute',
    float: 'left',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -65%)',
    width: '100%',
    maxWidth: '800px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    fontFamily: 'Motserrat',
    marginTop: 10,
    boxSizing: 'content-box'
};

export const DeleteModal = ({onOpen, onClose, open, row, handleClose}) => {
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        if (row?.id !=null) {
            read(row.id, setVinyl)
        }
    }, []);

    const onSubmit = async (e) => {
        console.log('Delete was set to YES')
        console.log("Vinyl image "+vinyl.image)
        try {
            await deleteFile(vinyl.image);
            console.log('Image file delete successfull!')
            console.log("Vinyl id "+vinyl.id)
            await delete_(vinyl.id)
            console.log('Vinyl delete successfull!')
            alert('Delete was succesfully!')
        } catch (error) {
            alert('Error occurred during Delete operation!')
        }
        handleClose();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{backdrop: {timeout: 500,},}}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="modal-content justify-content-center border border-5 border-danger">
                            <div className="modal-header">
                                <h2 className="modal-title w-100 text-center">Confirmation</h2>
                            </div>
                            <div className="modal-body text-center">This action cannot be undone. Are you sure?</div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-primary m-3" onClick={onSubmit}>Yes</button>
                                <button type="button" className="btn btn-danger m-3" onClick={handleClose}>No</button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};