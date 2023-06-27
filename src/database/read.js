import { collection, getDocs, query, where } from 'firebase/firestore';
import {db} from './config'
import { addDays, parse } from 'date-fns';
/**
 * Loads all documents from the Tasks collection
 * 
 * @returns 
 * Array with the posts
 */
export async function load(){

    const querySnapshot = await getDocs(collection(db,"Items"));
    return processQuerySnapshot(querySnapshot);
}
function processQuerySnapshot(querysnapshot){
    const data = [];

    querysnapshot.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id
        });
    });
    return data;
}

export async function loadItemExpiringInTwoDays(){
    
    const startOfToday = new Date();
    startOfToday.setUTCHours(0,0,0,0);
    const dbCollection = collection(db, 'Items');
    const dbQuery = query(dbCollection, where("expiryDate", ">", 
    startOfToday ));
    const querySnapshot = await getDocs(dbQuery);
    return processQuerySnapshot(querySnapshot);
}