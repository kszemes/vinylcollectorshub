import {storage} from "./firebaseApp.js"

import {ref, deleteObject} from "firebase/storage";

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