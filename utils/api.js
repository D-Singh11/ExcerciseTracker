import {AsyncStorage} from 'react-native';
import {CALENDAR_STORAGE_KEY} from './_calender';

// function used to add item to the localstorage/AsyncStorage
// entry is data added by user and key is used to storate that data against that key
export function submitEntry({entry, key}){
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({        // sy=toarge object as string converetd to string using JSON.stringigy
        [key]: entry
    }))
}



// functio used to remove and entry/data from the AsyncStorage
// @params key of type string which is used to remove the object with that key fro the storage.

export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)               // get all the data in storage linked to application's key
    .then(results => {
        const data = JSON.parse(results);               // conver data from strings to JSON
        data[key] = undefined;              // set key(passed as argument) data to undefined/clear data stored at that key
        delete data[key]                    // delete the key from the storage
    });
}