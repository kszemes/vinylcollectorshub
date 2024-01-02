import {Audio, ProgressBar} from 'react-loader-spinner'
import React, {useContext} from "react";
import {UserContext} from "../context/UserContext.jsx";
import Avatar from "@mui/material/Avatar";

export const UserAvatar = () => {

    const {user} = useContext(UserContext)
    return (
        <>
            {user.photoURL !== null ? (
                <img title={user.displayName} className='avatar-logo' src={user.photoURL} alt='User Profile Photo'/>
            ) : (
                <Avatar title={user.displayName}/>
            )
            }
        </>
    )
}