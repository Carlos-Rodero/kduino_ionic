import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class BdKduinoProvider {
  // public properties

  db: SQLiteObject = null;

  constructor() { }

  // public methods
  /*
  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }
  
  create(task: any){
    let sql = 'INSERT INTO tasques(title, completed) VALUES(?,?)';
    return this.db.executeSql(sql, [task.title, task.completed]);
  }
  
  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasques(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER)';
    return this.db.executeSql(sql, []);
  }
  
  delete(task: any){
    let sql = 'DELETE FROM tasques WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }
  
  getAll(){
    let sql = 'SELECT * FROM tasques';
    return this.db.executeSql(sql, [])
      .then(response => {
        let tasks = [];
        for (let index = 0; index < response.rows.length; index++) {
          tasks.push( response.rows.item(index) );
        }
        return Promise.resolve( tasks );
      })
      .catch(error => Promise.reject(error));
  }
  
  update(task: any){
    let sql = 'UPDATE tasques SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }
  */
}

