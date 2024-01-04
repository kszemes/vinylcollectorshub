import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {useForm} from "react-hook-form";
import {read} from "../utility/vinyl_crud.js";
import {NotFound} from "./NotFound.jsx";

export const AddEditItem = () => {
    const {user} = useContext(UserContext)
    const {register, handleSubmit, formState: {errors}, setValue} = useForm();
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null)
    const [uploaded, setUploaded] = useState(false)
    const param = useParams();
    const [vinyl, setVinyl] = useState(null);

    useEffect(() => {
        if (param?.id) {
            read(param.id, setVinyl).then(()=> console.log('Fetch is OK!'))
        }
    }, [param?.id]);

    if (!user) return (<NotFound/>)

        return (
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
        );
};