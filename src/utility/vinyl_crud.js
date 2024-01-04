import {db} from "./firebaseApp.js"
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    limit
} from "firebase/firestore";
import {Vinyl} from "../model/vinyl.js"

export const create = async (formData) => {
    const collectionRef = collection(db, "vinyl");
    const newItem = {...formData, timeStamp: serverTimestamp()};
    const newDocRef = await addDoc(collectionRef, newItem);
}

export const getVinylsByUid = async (setVinyls, user) => {
    const collectionRef = collection(db, "vinyl");
    const q = query(collectionRef, where('userId', '==', user.uid))
    return onSnapshot(q, (snapshot) => {
        setVinyls(snapshot.docs.map(doc => (
                {...new Vinyl(doc.data(), doc.id)}
            )
        ))
    });
}

export const getVinylsOnSale = async (setVinyls) => {
    const collectionRef = collection(db, "vinyl");
    const q = query(collectionRef, where('forSale', '==', true))
    return onSnapshot(q, (snapshot) => {
        setVinyls(snapshot.docs.map(doc => (
                {...new Vinyl(doc.data(), doc.id)}
            )
        ))
    });
}

export const read = async (id, setVinyl) => {
    const docRef = doc(db, "vinyl", id);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setVinyl(new Vinyl(docSnap.data(), docSnap.id))
        } else {
            console.log('Nincs ilyen Documentum az alábbi ID-vel: ' + id)
        }
    } catch (e) {
        console.log('Hiba az adatbázis olvasása során! ' + e);
    }
}

export const update = async (id, {title, category, description}) => {
    const docRef = doc(db, "vinyl", id);
    await updateDoc(docRef, {title, category, description})
}

export const delete_ = async (id) => {
    const docRef = doc(db, "vinyl", id);
    await deleteDoc(docRef);
}