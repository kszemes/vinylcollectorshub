import React, {useContext, useEffect, useState} from 'react';
import {Col, Form, FormGroup, Label, Row} from 'reactstrap'
import {useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {useForm} from "react-hook-form";
import {create, read, update} from "../utility/vinyl_crud.js";
import {NotFound} from "./NotFound.jsx";
import {Backdrop, Fade, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {MyAlert} from "../components/MyAlert.jsx";
import {Loader} from "../components/Loader.jsx";
import {FormatContext} from "../context/FormatProvider.jsx";
import {recordGenres} from "../context/GenreProvider.jsx";
import {countryList} from "../context/CountryProvider.jsx";
import {recordStyle} from "../context/StyleProvider.jsx";

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

export const AddEditItem = ({onOpen, onClose, open, object, handleClose}) => {
    const {user} = useContext(UserContext)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const {formats} = useContext(FormatContext)
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        if (object?.id) {
            read(object.id, setVinyl);
        }
    }, []);

    useEffect(() => {
        if (vinyl && vinyl?.id) {
            setValue('id', vinyl.id);
            setValue('artist', vinyl.artist);
            setValue('title', vinyl.title);
            setValue('label', vinyl.label);
            setValue('format', vinyl.format);
            setValue('country', vinyl.country);
            setValue('released', vinyl.released);
            setValue('genre', vinyl.genre);
            setValue('style', vinyl.style);
            setValue('forSale', vinyl.forSale);
            setValue('price', vinyl.price);
        }
    }, [vinyl]);

    const onSubmit = async (vinyl, e) => {
        e.preventDefault()
        setLoading(true)
        if (vinyl.id) {
            try {
                let forSale = document.getElementById('selectForSale').value
                vinyl.forSale = forSale === 'true';
                const newData = {...vinyl}
                console.log(newData)
                await update(vinyl.id,{...newData});
                setUploaded(true);
                alert('Sikeres módosítás!')
            } catch (e) {
                console.log('Hiba update esetén: '+e)
            }finally {
                setLoading(false);
                open=false;
            }
        } else {
            try {
                let forSale = document.getElementById('selectForSale').value
                vinyl.forSale = forSale === 'true';
                vinyl.price = +vinyl.price;
                vinyl.userId = user.uid;
                vinyl.image = '';
                console.log(vinyl)
                const newData = {...vinyl}
                await create({...newData})
                setUploaded(true)
                alert('Sikeres record létrehozás!')
            } catch (error) {
                console.log('Hiba a fájlfeltöltés során!');
            } finally {
                setLoading(false)
            }

        }
        e.target.reset()
        handleClose();
    }

    function atLeastOneSelected(value) {
        return Array.isArray(value) && value.length > 0;
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
                        <h2>{vinyl?.id ? 'Update' : 'Create'} record</h2>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Artist</Label>
                                        <input type="text" {...register('artist', {required: true})} className="form-control"/>
                                        {errors.artist && <p className="errMsg">Artist is required!</p>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Title</Label>
                                        <input type="text" {...register('title', {required: true})} className="form-control"/>
                                        {errors.title && <p className="errMsg">Title is required!</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Label</Label>
                                        <input type="text" {...register('label', {required: true})} className="form-control"/>
                                        {errors.label && <p className="errMsg">Label is required!</p>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Format</Label>
                                        <select multiple{...register('format', {
                                            required: true, validate: atLeastOneSelected
                                        })} className="form-select">
                                            <option value="" disabled>select format...</option>
                                            {formats.map(ctg => <option key={ctg} value={ctg}>{ctg}</option>)}
                                        </select>
                                        {errors.format && <p className="errMsg">You must choose at least one format for your record!</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Country</Label>
                                        <select {...register('country', {required: true})} className="form-select">
                                            <option value="" disabled>select country...</option>
                                            {countryList.map(ctg => <option key={ctg} value={ctg}>{ctg}</option>)}
                                        </select>
                                        {errors.country && <p className="errMsg">You must choose at least one country for your record!</p>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Released</Label>
                                        <input type="number" {...register('released', {required: false, minLength: 4, maxLength: 4})} className="form-control"/>
                                        {errors.released && <p className="errMsg">Release date is not valid!</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Genre</Label>
                                        <select {...register('genre', {required: true})} className="form-select">
                                            <option value="" disabled>select genre...</option>
                                            {recordGenres.map(ctg => <option key={ctg} value={ctg}>{ctg}</option>)}
                                        </select>
                                        {errors.genre && <p className="errMsg">You must choose at least one genre for your record!</p>}
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Style</Label>
                                        <select multiple {...register('style', {required: true, validate: atLeastOneSelected })} className="form-select">
                                            <option value="" disabled>select style...</option>
                                            {recordStyle.map(ctg => <option key={ctg} value={ctg}>{ctg}</option>)}
                                        </select>
                                        {errors.style && <p className="errMsg">You must choose at least one style for your record!</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>For Sale?</Label>
                                        <select id='selectForSale' {...register('forSale')} className="form-select">
                                            <option value="false">false</option>
                                            <option value="true">true</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Price</Label>
                                        <input type="number" defaultValue="0" {...register('price', {required: false, min: 0})} className="form-control"/>
                                        {errors.price && <p className="errMsg">Not a valid price!</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className='row text-center'>
                                <Col md={6}>
                                    <input type="submit" className="btn btn-primary"/>
                                </Col>
                                <Col md={6}>
                                    <button type='button' className='btn btn-danger' onClick={handleClose}>Close</button>
                                </Col>
                            </Row>
                        </Form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};