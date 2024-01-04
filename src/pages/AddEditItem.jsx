import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {useForm} from "react-hook-form";
import {read} from "../utility/vinyl_crud.js";
import {NotFound} from "./NotFound.jsx";
import {Backdrop, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";

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


export const AddEditItem = ({onOpen, onClose, open, object}) => {
    const {user} = useContext(UserContext)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const param = useParams();
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        if (object?.id != null) {
            read(object.id, setVinyl).then(()=> console.log('Fetch is OK!'))
        }
    }, [object?.id]);

    if (!user) return (<NotFound/>)

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
                        {vinyl ?
                            <>
                                <h3>Update record</h3>
{/*                                <div className="content-modal">
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
                                </div>*/}
                            </>
                            :
                            <h3>Create Record</h3>
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );

/*        return (
            <>
                <h3>{param?.id ? 'Update' : 'Create'} vinyl</h3>
                {vinyl && <div>
                    <p>{vinyl.id}</p>
                    <img src={vinyl.thumbnailImage}/>
                    <img src={vinyl.image}/>
                    <p>{vinyl.artist}</p>
                    <p>{vinyl.title}</p>
                    <p>{vinyl.label}</p>
                    <p>{vinyl.format.map((data) => <li key={data}>{data}</li>)}</p>
                    <p>{vinyl.country}</p>
                    <p>{vinyl.released}</p>
                    <p>{vinyl.genre}</p>
                    <p>{vinyl.style.map((data) => <li key={data}>{data}</li>)}</p>
                    <p>{vinyl.userId}</p>
                </div>}
            </>
        );*/
};