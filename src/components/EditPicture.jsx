import React, {useEffect, useState} from 'react';
import {Backdrop, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {read, update} from "../utility/vinyl_crud.js";
import {Col, Form, FormGroup, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import {Loader} from "./Loader.jsx";
import {uploadFile} from "../utility/file_crud.js";

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

export const EditPicture = ({onOpen, onClose, open, row}) => {
    const [vinyl, setVinyl] = useState(null);
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() => {
        if (row?.id !=null) {
            read(row.id, setVinyl)
        }
    }, []);

    const onSubmit = async (data, e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const file = data.file[0]
            const photoUrl = await uploadFile(file, 'images')
            console.log('a feltöltött fájl URLje:', photoUrl);
            vinyl.image = photoUrl;
            console.log("Vinyl image: "+vinyl.image)
            const newData = {...vinyl}
            await update(vinyl.id,{...newData});
            setUploaded(true)
        } catch (error) {
            console.log('Hiba a fájlfeltöltés során!');
        } finally {
            setLoading(false)
        }
        e.target.reset()
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
                        <div className="content-modal">
                            <div className='row text-center m-1'>
                                <h3>Edit record picture</h3>
                                <img className='col' src={row.image} alt='Record Image'/>
                            </div>
                            <div className='row text-center'>
                                <h2 className='col-6 border'>Artist: {row.artist}</h2>
                                <h2 className='col-6 border'>Title: {row.title}</h2>
                            </div>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='text-center'>
                                        {photo && <img src={photo} alt="New Photo" className="img-thumbnail" style={{maxWidth: '200px'}}/>}
                                    </div>
                                    <Row  className='m-2 justify-content-center'>
                                        <Col md={4}>
                                            <FormGroup>
                                                <input type="file" {...register('file', {
                                                    required: true, validate: (value) => {
                                                        const acceptedFormats = ['jpg', 'png', 'jpeg', 'bmp']
                                                        const fileExtension = value[0]?.name.split('.').pop().toLowerCase()
                                                        console.log(fileExtension)
                                                        if (!acceptedFormats.includes(fileExtension)) return 'Invalid file format!'
                                                        return true
                                                    }
                                                })}
                                                       className="form-control"
                                                       onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
                                                />
                                                <p className="errMsg">{errors?.file?.message}</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className='row justify-content-center'>
                                        <div className='col-auto'>
                                            <input type="submit" className="btn btn-primary"/>
                                        </div>
                                    </div>
                                    {loading && <Loader/>}
                                    {uploaded && alert('Image saved succesfully!')}
                                </Form>
                                <p className="errMsg">{errors?.file?.message}</p>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};