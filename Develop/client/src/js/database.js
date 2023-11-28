// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('contacts', 1, {
        upgrade(db) {
          if (db.objectStoreNames.contains('contacts')) {
            console.log('contacts database already exists');
            return;
          }
          db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
          console.log('contacts database created');
        },
      }
)};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    console.log('Post to the database');
    const contactsDb = await openDB('contacts', 1);
    const tx = contactsDb.transaction('contacts', 'readwrite');
    const store = tx.objectStore('contacts');
    const request = store.add({ name, home, cell, email });
    const result = await request;
    console.log('Data saved to the database', result);
 
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  
};

initdb();
