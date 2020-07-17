import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("rolls.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS rolls2 (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, rolls TEXT);", 
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject(err)
        }
      );
    });
  })
  return promise  
};

export const insertRoll = (title, rolls) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO rolls2 (title, rolls) VALUES (?, ?)`, 
        [title, rolls],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      );
    });
  })
  return promise  
}

export const fetchRolls = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM rolls2", 
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject(err)
        }
      );
    });
  })
  return promise  
}
