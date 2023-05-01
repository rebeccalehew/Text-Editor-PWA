import { openDB } from 'idb';

// create database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // create connection to DB
  const jateDb = await openDB('jate', 1);

  // create new transaction - specify DB & data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // open object store
  const store = tx.objectStore('jate');

  // get confirmation of request
  const request = store.put({ text: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// method that gets all the content from the database
export const getDb = async () => {

  // create connection to DB
  const jateDb = await openDB('jate', 1);
  
  // create new transaction - specify DB and data privileges
  const tx = jateDb.transaction('jate', 'readonly');
  
  // open object store
  const store = tx.objectStore('jate');
  
  // use .getAll() method to retrieve all data in indexedDB
  const request = store.getAll();
  
  // get confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
};

// start the database
initdb();
