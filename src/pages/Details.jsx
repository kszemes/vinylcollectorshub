import React, {useEffect, useState} from 'react';
import {Backdrop, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {read} from "../utility/vinyl_crud.js";

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

export const Details = ({onOpen, onClose, open, row}) => {
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        if (row?.id !=null) {
            read(row.id, setVinyl)
        }
    }, []);

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
                        {row ?
                            <>
                                <div className="content-modal">
                                    <div className='d-flex m-auto'>
                                        <img className='col' src={row.image} alt='Vinyl Image'/>
                                        <div className='col col-auto m-1'>
                                            <div>Artist: {row.artist}</div>
                                            <div>Title: {row.title}</div>
                                            <div>Label: {row.label}</div>
                                            <div>Format: {row.format.map((data) =>
                                                <li key={data}>{data}</li>)}
                                            </div>
                                            <div>Country: {row.country}</div>
                                            <div>Released: {row.released}</div>
                                            <div>Genre: {row.genre}</div>
                                            <div>Style: {row.style.map((data) =>
                                                <li key={data}>{data}</li>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div>Loading...</div>
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};