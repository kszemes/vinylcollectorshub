import {storage} from "./firebaseApp.js"
import {v4 as uuidv4} from 'uuid'

import {ref, deleteObject, uploadBytes, getDownloadURL} from "firebase/storage";

export const deleteFile = async (url) => {
    const fileRef = ref(storage, url);
    try {
        await deleteObject(fileRef);
        return true;
    } catch (e) {
        console.log('deleteFile: Error deleting file: ' + e)
        return false;
    }
}

export const uploadFile = async (file, folder) =>{
    try {
        const fileRef = ref(storage, `${folder}/${uuidv4() + file.name.slice(-4)}`);
        await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    } catch (e) {
        console.log('Hiba a file feltöltés közben! ',e.message);
        throw e
    }
}