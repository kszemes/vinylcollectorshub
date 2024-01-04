import React, {useEffect, useState} from 'react';
import {Backdrop, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {read} from "../utility/vinyl_crud.js";
import {useParams} from "react-router-dom";

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
    p: 4,
    fontFamily: 'Motserrat',
    marginTop: 10,
};

export const Details = ({ onOpen, onClose, open, row }) => {
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        read(row.id, setVinyl)
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
                                <img src={row.image} alt='Vinyl Image'/>
                                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                    <div>
                                        <b>{row?.title}</b>
                                    </div>
                                </Box>
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