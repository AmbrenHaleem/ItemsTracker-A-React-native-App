import { collection, addDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import {db} from './config'
/**
 * Save task to the Tasks collection
 * 
 * @returns 
 * Newly added task id
 */
export async function save(data){
    try{
        const dbCollection = collection(db, 'Items');
        const docRef = await addDoc(dbCollection, data);
        return docRef.id;
    }catch (e){
        return null;
    }
}
/**
 * Update task against task id
 * 
 * @returns 
 * Boolean value represents success or failure
 */
export async function update(id, data){
    try{
        const docRef = doc(db, 'Items', id);
        await updateDoc(docRef, data);
        return true;
    }
    catch(e){
        return false;
    }
}
/**
 * remove task from Task collection against task ID
 * 
 * @returns 
 * Boolean value represents success or failure
 */
export async function remove(id){
    try{
        const docRef = doc(db, 'Items', id);
        await deleteDoc(docRef);
        return true;
    }
    catch(e){
        return false;
    }
}